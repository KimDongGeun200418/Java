"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("./backend/state");
var common_1 = require("./common");
var errors_1 = require("./errors");
var DEFAULT_VARIABLE_NAME_PREFIX = 'Variable';
/**
 * A `tf.layers.LayerVariable` is similar to a `tf.Tensor` in that it has a
 * dtype and shape, but its value is mutable.  The value is itself represented
 * as a`tf.Tensor`, and can be read with the `read()` method and updated with
 * the `write()` method.
 */
var LayerVariable = /** @class */ (function () {
    /**
     * Construct Variable from a `tf.Tensor`.
     *
     * If not explicitly named, the Variable will be given a name with the
     * prefix 'Variable'. Variable names are unique. In the case of name
     * collision, suffixies '_<num>' will be added to the name.
     *
     * @param val Initial value of the Variable.
     * @param name Name of the variable. If `null` or `undefined` is provided, it
     *   will default a name with the prefix 'Variable'.
     * @param constraint Optional, projection function to be applied to the
     * variable after optimize updates
     * @throws ValueError if `name` is `null` or `undefined`.
     */
    function LayerVariable(val, dtype, name, trainable, constraint) {
        if (dtype === void 0) { dtype = 'float32'; }
        if (name === void 0) { name = DEFAULT_VARIABLE_NAME_PREFIX; }
        if (trainable === void 0) { trainable = true; }
        if (constraint === void 0) { constraint = null; }
        this.dtype = dtype == null ? 'float32' : dtype;
        this.shape = val.shape;
        this.id = state_1.getNextUniqueTensorId();
        name = name == null ? DEFAULT_VARIABLE_NAME_PREFIX : name;
        this.originalName = common_1.getScopedTensorName(name);
        this.name = common_1.getUniqueTensorName(this.originalName);
        this.trainable_ = trainable;
        this.constraint = constraint;
        this.val = tfc.variable(val, this.trainable_, this.name, this.dtype);
    }
    /**
     * Get a snapshot of the Variable's value.
     *
     * The returned value is a snapshot of the Variable's value at the time of
     * the invocation. Future mutations in the value of the tensor will only
     * be reflected by future calls to this method.
     */
    LayerVariable.prototype.read = function () {
        this.assertNotDisposed();
        return this.val;
    };
    /**
     * Update the value of the Variable.
     *
     * @param newVal: The new value to update to. Must be consistent with the
     *   dtype and shape of the Variable.
     * @return This Variable.
     */
    LayerVariable.prototype.write = function (newVal) {
        // TODO(cais): Once  TF.js Core supports Tensor.dtype, check dtype match.
        this.assertNotDisposed();
        checkShapesMatch(this.val, newVal);
        // Skip updating if this is the exact same tensor.
        if (this.val.id !== newVal.id) {
            this.val.assign(newVal);
            if (this.constraint != null) {
                this.val.assign(this.constraint.apply(this.val));
            }
        }
        return this;
    };
    /**
     * Dispose this LayersVariable instance from memory.
     */
    LayerVariable.prototype.dispose = function () {
        this.assertNotDisposed();
        this.val.dispose();
    };
    LayerVariable.prototype.assertNotDisposed = function () {
        if (this.val.isDisposed) {
            throw new Error("LayersVariable " + this.name + " is already disposed.");
        }
    };
    Object.defineProperty(LayerVariable.prototype, "trainable", {
        get: function () {
            return this.trainable_;
        },
        set: function (trainable) {
            this.trainable_ = trainable;
            this.val.trainable = trainable;
        },
        enumerable: true,
        configurable: true
    });
    return LayerVariable;
}());
exports.LayerVariable = LayerVariable;
function checkShapesMatch(x, y) {
    if (x.shape.toString() !== y.shape.toString()) {
        throw new Error('Shape mismatch: ' + JSON.stringify(x.shape) + ' vs. ' +
            JSON.stringify(y.shape));
    }
}
/**
 * Create a Variable.
 * @param x The initial value of the `Variable`.
 * @param dtype optional, the type of the variable.
 * @param name optional, the name of the variable, default provided by
 * Variable.
 * @param constraint optional, a constraint to be applied after every update.
 * @return The newly instantiated `Variable`.
 */
function variable(x, dtype, name, constraint) {
    return new LayerVariable(x, dtype, name, true, constraint);
}
exports.variable = variable;
/**
 * Instantiates an all-zeros Variable and returns it.
 *
 * @param shape Shape of the tensor.
 * @param dtype DType of the tensor.
 * @param name Name of the tensor.
 * @return An all-zero Variable.
 */
function zerosVariable(shape, dtype, name) {
    // TODO(cais): Implement logic for dtype.
    return new LayerVariable(tfc.zeros(shape), dtype, name);
}
exports.zerosVariable = zerosVariable;
/**
 * Instantiates an all-zeros tensor of the same shape as another tensor.
 *
 * @param x The other tensor.
 * @param dtype DType of the tensor.
 * @param name Name of the tensor.
 * @return A newly instantiated Variable.
 */
function zerosLike(x, dtype, name) {
    return new LayerVariable(tfc.zerosLike(x), dtype, name);
}
exports.zerosLike = zerosLike;
/**
 * Instantiates an all-ones tensor and returns it.
 *
 * @param shape Shape of the tensor.
 * @param dtype DType of the tensor.
 * @param name Name of the tensor.
 * @return An all-ones Variable.
 */
function onesVariable(shape, dtype, name) {
    // TODO(cais): Implement logic for dtype.
    var allocated = tfc.ones(shape);
    return new LayerVariable(allocated, dtype, name);
}
exports.onesVariable = onesVariable;
/**
 * Instantiates an all-ones tensor of the same shape as another tensor.
 *
 * @param x The other tensor.
 * @param dtype DType of the tensor.
 * @param name Name of the tensor.
 * @return A newly instantiated Variable.
 */
function onesLike(x, dtype, name) {
    var allocated = tfc.onesLike(x);
    return new LayerVariable(allocated, dtype, name);
}
exports.onesLike = onesLike;
/**
 * Instantiate an identity matrix and returns it, as a Variable
 *
 * @param size Number of rows/columns.
 * @param dtype Data type of returned Variable.
 * @param name Name of returned Variable.
 * @return A Variable, an identity matrix.
 */
function eyeVariable(size, dtype, name) {
    return new LayerVariable(tfc.eye(size), dtype, name);
}
exports.eyeVariable = eyeVariable;
/**
 * Get a Variable with uniform distribution of values.
 * @param shape Shape of the tensor.
 * @param minval Lower bound of the uniform distribution.
 * @param maxval Upper bound of the uniform distribution.
 * @param dtype
 * @param seed
 * @param name Optional name.
 * @return The uniform-random Variable.
 */
function randomUniformVariable(shape, minval, maxval, dtype, seed, name) {
    if (name === void 0) { name = 'randomUniform'; }
    return new LayerVariable(tfc.randomUniform(shape, minval, maxval, dtype), dtype, name);
}
exports.randomUniformVariable = randomUniformVariable;
/**
 * Get a Variable with truncated-normal distribution of values.
 * @param shape Shape of the tensor.
 * @param mean mean value of the normal distribution.
 * @param stddev standard deviation of the normal distribution.
 * @param dtype
 * @param seed
 * @param name Optional name.
 * @return The truncated-normal-random Variable.
 */
function truncatedNormalVariable(shape, mean, stddev, dtype, seed, name) {
    if (mean === void 0) { mean = 0.0; }
    if (stddev === void 0) { stddev = 1.0; }
    if (name === void 0) { name = 'truncatedNormal'; }
    // TODO(cais): Implement logic for dtype and seed once they are supported
    // by deeplearn.js.
    dtype = dtype || 'float32';
    if (dtype !== 'float32' && dtype !== 'int32') {
        throw new errors_1.NotImplementedError("randomNormal does not support dType " + dtype + ".");
    }
    return new LayerVariable(tfc.truncatedNormal(shape, mean, stddev, dtype, seed), dtype, name);
}
exports.truncatedNormalVariable = truncatedNormalVariable;
/**
 * Get a Variable with normal distribution of values.
 * @param shape Shape of the tensor.
 * @param mean mean value of the normal distribution.
 * @param stddev standard deviation of the normal distribution.
 * @param dtype
 * @param seed
 * @param name Optional name.
 * @return The truncated-normal-random Variable.
 */
function randomNormalVariable(shape, mean, stddev, dtype, seed, name) {
    if (mean === void 0) { mean = 0.0; }
    if (stddev === void 0) { stddev = 1.0; }
    if (name === void 0) { name = 'randomNormal'; }
    dtype = dtype || 'float32';
    if (dtype !== 'float32' && dtype !== 'int32') {
        throw new errors_1.NotImplementedError("randomNormalVariable does not support dType " + dtype + ".");
    }
    return new LayerVariable(tfc.randomNormal(shape, mean, stddev, dtype, seed), dtype, name);
}
exports.randomNormalVariable = randomNormalVariable;
/**
 * Update the value of a Variable.
 * @param x The Variable to be updated.
 * @param xNew The new value to update to.
 * @return The Variable updated.
 */
function update(x, xNew) {
    return x.write(xNew);
}
exports.update = update;
/**
 * Update the value of a Variable by adding an increment.
 * @param x The Variable to be updated.
 * @param increment The incrment to add to `x`.
 * @return The Variable updated.
 */
function updateAdd(x, increment) {
    return x.write(tfc.add(x.read(), increment));
}
exports.updateAdd = updateAdd;
/**
 * Update the value of a Variable by subtracting a decrement.
 * @param x The Variable to be updated.
 * @param decrement The decrement to subtract from `x`.
 * @return The Variable updated.
 */
function updateSub(x, decrement) {
    return x.write(tfc.sub(x.read(), decrement));
}
exports.updateSub = updateSub;
/**
 * Get the values of an array of Variables.
 *
 * @param tensors An `Array` of `Variable`s to get the values of.
 * @return The values of the inputs, as an `Array` of`tf.Tensor`s.
 */
function batchGetValue(xs) {
    return xs.map(function (x) { return x.read(); });
}
exports.batchGetValue = batchGetValue;
/**
 * Update the value of multiple Variables at once.
 *
 * @param variablesAndValues An `Array`, each element is of type
 *   [Variable, Tensor]. The first item is the
 *   `Variable` of which the value is to be updated. The second item
 *   carries the new value.
 */
function batchSetValue(variablesAndValues) {
    variablesAndValues.forEach(function (variableAndValue) {
        var variable = variableAndValue[0];
        variable.write(variableAndValue[1]);
    });
}
exports.batchSetValue = batchSetValue;
/**
 * Returns the gradients of `variables` w.r.t. the return value of `lossFn`.
 * @param lossFn A function which returns a Scalar to be used as the function
 *   value (i.e., numerator) for differentiation.
 * @param variables List of variables to be used as the independent variables
 *   (i.e., denominator) for differentiation.
 * @returns An Array of gradients tensors.
 */
function gradients(lossFn, variables) {
    // TODO(cais): The return type signature can be simplified if deeplearn makes
    //   the corresponding type public.
    var variableList = variables.map(function (variable) { return variable.read(); });
    var valudAndGrads = tfjs_core_1.variableGrads(lossFn, variableList);
    return variables.map(function (variable) { return valudAndGrads.grads[variable.name]; });
}
exports.gradients = gradients;
//# sourceMappingURL=variables.js.map