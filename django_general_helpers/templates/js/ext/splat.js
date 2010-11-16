var isArray = function(val) {
    return val &&
        typeof(val) === 'object' &&
        typeof(val.length) === 'number' &&
        typeof(val.splice) === 'function' &&
        !(val.propertyIsEnumerable('length'));
}

splat = function(a){ return isArray(a) ? a : [a]; };
