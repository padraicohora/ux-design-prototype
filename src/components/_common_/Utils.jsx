import _ from "lodash";

export function ensureNonEmpty(ary) {
    return _.isArray(ary) ? ary : [];
}

export function ensureNonNull(object) {
    return object ? object : {};
}

export function uniqueId() {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
}

export function getFilteredProps(object, predicate) {
    const dataProps = {};
    Object.keys(ensureNonNull(object)).filter(predicate).forEach((dataKey) => {
        dataProps[dataKey] = object[dataKey];
    });
    return dataProps;
}

export function debounce(callback, wait) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            callback.apply(this, arguments);
        }, wait);
    };
}

export function toURLQueryString(parameters) {
    return Object.keys(parameters).map(key => {
        if (Array.isArray(parameters[key])) {
            return parameters[key].map((value) => key + "=" + value).join("&");
        } else {
            return key + "=" + parameters[key];
        }
    }).join("&");
}

export function buildAndExpand(api, parameters, appendQueryParameters) {
    let apiCopy = _.clone(api);
    Object.entries(parameters).forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        apiCopy = _.replace(apiCopy, ":" + key, value);
    });
    // optionally append query string
    if (appendQueryParameters) apiCopy = appendQueryString(apiCopy, parameters);
    return apiCopy;
}

export function appendQueryString(api, parameters) {
    let apiCopy = _.clone(api);
    apiCopy = _.replace(apiCopy, "?", "");
    apiCopy = apiCopy + "?" + toURLQueryString(parameters);
    return apiCopy;
}


export function hasValidationError(object, type, field) {
    return _.findIndex(ensureNonEmpty(ensureNonNull(object).errors), (error) => error.type === type && error.field === field) >= 0;
}

export function buildThresholdArray() {
    return Array.from(Array(100).keys(), (i) => i / 100);
}

export function mountQuestionnaireAnchors(questionnaire) {
    const anchors = [];

    questionnaire.forEach((item) => {
        if (item.type === "group") {
            item.item.forEach((itemGroup) => {
                if (itemGroup.type === "choice") {
                    anchors.push(itemGroup.linkId);
                }
            });
        }
        if (item.type === "choice") {
            anchors.push(item.linkId);
        }
    });

    return anchors;
}

export function isPublishQuestionnaireAllowed(questionnaire, questionnaireResponse, status) {
    const requiredItems = [];
    questionnaire.item.forEach((group) => {
        if (group.type === "group") {
            const isRequired = group.item.filter((item) => item.required);
            if (isRequired) {
                isRequired.forEach((required) => {
                    requiredItems.push(required.linkId);
                });
            }
        }
    });
    const responses = questionnaireResponse && questionnaireResponse.length > 0 && questionnaireResponse.filter((response) => requiredItems.includes(response.linkId));
    if(requiredItems.length === (responses && responses.length) && status !== "completed") {
        return true;
    } else {
        return false;
    }
}


export function buildCacheObject(name, response) {
    return {
        name,
        page: response.data.cursor.currentPageIndex + 1,
        totalPages: response.data.cursor.totalPages,
        totalElements: response.data.cursor.totalElements,
    };
}

export const buildServerFeedback = (response) => {
    const checkedResponse = response && response.response;
    const data = checkedResponse && checkedResponse.data;
    if (!_.isEmpty(data)) {
        return {
            ...(checkedResponse.status && { httpStatusCode: checkedResponse.status }),
            ...(data.code && { code: data.code }),
            ...(data.message && { message: data.message }),
            ...(data.errors && { errors: data.errors }),
        };
    }
    if (!checkedResponse && response.status) {
        return {
            httpStatusCode: response.status,
        };
    }
};


