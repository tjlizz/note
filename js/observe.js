function defineReactive(target, key, value) {
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                value = newValue
            }
        }
    })
}

function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }
     for (let key in target) {
        defineReactive(target, key, target[key])
    }
}