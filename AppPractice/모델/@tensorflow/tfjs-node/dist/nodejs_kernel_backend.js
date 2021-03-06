"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var tfjs_1 = require("@tensorflow/tfjs");
// tslint:disable-next-line: no-imports-from-dist
var backend_1 = require("@tensorflow/tfjs-core/dist/backends/backend");
var util_1 = require("util");
var int64_tensors_1 = require("./int64_tensors");
var NodeJSKernelBackend = /** @class */ (function (_super) {
    __extends(NodeJSKernelBackend, _super);
    function NodeJSKernelBackend(binding, packageName) {
        var _this = _super.call(this) || this;
        _this.binding = binding;
        _this.isGPUPackage = packageName === '@tensorflow/tfjs-node-gpu';
        _this.isUsingGpuDevice = _this.binding.isUsingGpuDevice();
        _this.tensorMap = new tf.DataStorage(_this, tf.engine());
        return _this;
    }
    NodeJSKernelBackend.prototype.getDTypeInteger = function (dtype) {
        switch (dtype) {
            case 'float32':
                return this.binding.TF_FLOAT;
            case 'int32':
                return this.binding.TF_INT32;
            case 'bool':
                return this.binding.TF_BOOL;
            case 'complex64':
                return this.binding.TF_COMPLEX64;
            case 'string':
                return this.binding.TF_STRING;
            default:
                throw new Error("Unsupported DType: " + dtype);
        }
    };
    NodeJSKernelBackend.prototype.typeAttributeFromTensor = function (value) {
        return this.getDTypeInteger(value.dtype);
    };
    // Creates a new Tensor and maps the dataId to the passed in ID.
    NodeJSKernelBackend.prototype.createOutputTensor = function (metadata) {
        var newId = {};
        this.tensorMap.set(newId, {
            shape: metadata.shape,
            dtype: metadata.dtype,
            id: metadata.id,
            values: null
        });
        var dtype;
        switch (metadata.dtype) {
            case this.binding.TF_FLOAT:
                dtype = 'float32';
                break;
            case this.binding.TF_INT32:
                dtype = 'int32';
                break;
            case this.binding.TF_BOOL:
                dtype = 'bool';
                break;
            case this.binding.TF_COMPLEX64:
                dtype = 'complex64';
                break;
            case this.binding.TF_STRING:
                dtype = 'string';
                break;
            case this.binding.TF_RESOURCE:
                // NOTE(cais): We currently represent resource-type Tensors
                // as string of ubytes.
                dtype = 'string';
                break;
            case this.binding.TF_UINT8:
                // TensorFlow uses UINT8 as dtype for image tensor. UINT8 is not
                // supported in TFJS yet, cast it to int32.
                dtype = 'int32';
                break;
            default:
                throw new Error("Unknown dtype enum " + metadata.dtype);
        }
        return tf.engine().makeTensorFromDataId(newId, metadata.shape, dtype);
    };
    // Prepares Tensor instances for Op execution.
    NodeJSKernelBackend.prototype.getInputTensorIds = function (tensors) {
        var ids = [];
        for (var i = 0; i < tensors.length; i++) {
            if (tensors[i] instanceof int64_tensors_1.Int64Scalar) {
                // Then `tensors[i]` is a Int64Scalar, which we currently represent
                // using an `Int32Array`.
                var value = tensors[i].valueArray;
                var id = this.binding.createTensor([], this.binding.TF_INT64, value);
                ids.push(id);
            }
            else {
                var info = this.tensorMap.get(tensors[i].dataId);
                // TODO - what about ID in this case? Handle in write()??
                if (info.values != null) {
                    // Values were delayed to write into the TensorHandle. Do that before
                    // Op execution and clear stored values.
                    info.id =
                        this.binding.createTensor(info.shape, info.dtype, info.values);
                    info.values = null;
                }
                ids.push(info.id);
            }
        }
        return ids;
    };
    NodeJSKernelBackend.prototype.createReductionOpAttrs = function (tensor) {
        return [
            { name: 'keep_dims', type: this.binding.TF_ATTR_BOOL, value: false },
            createTypeOpAttr('T', tensor.dtype), createTypeOpAttr('Tidx', 'int32')
        ];
    };
    NodeJSKernelBackend.prototype.executeSingleInput = function (name, input) {
        var opAttrs = [createTypeOpAttr('T', input.dtype)];
        return this.executeSingleOutput(name, opAttrs, [input]);
    };
    NodeJSKernelBackend.prototype.floatPrecision = function () {
        return 32;
    };
    NodeJSKernelBackend.prototype.epsilon = function () {
        return backend_1.EPSILON_FLOAT32;
    };
    /**
     * Executes a TensorFlow Eager Op that provides one output Tensor.
     * @param name The name of the Op to execute.
     * @param opAttrs The list of Op attributes required to execute.
     * @param inputs The list of input Tensors for the Op.
     * @return A resulting Tensor from Op execution.
     */
    NodeJSKernelBackend.prototype.executeSingleOutput = function (name, opAttrs, inputs) {
        var outputMetadata = this.binding.executeOp(name, opAttrs, this.getInputTensorIds(inputs), 1);
        return this.createOutputTensor(outputMetadata[0]);
    };
    /**
     * Executes a TensorFlow Eager Op that provides multiple output Tensors.
     * @param name The name of the Op to execute.
     * @param opAttrs The list of Op attributes required to execute.
     * @param inputs The list of input Tensors for the Op.
     * @param numOutputs The number of output Tensors for Op execution.
     * @return A resulting Tensor array from Op execution.
     */
    NodeJSKernelBackend.prototype.executeMultipleOutputs = function (name, opAttrs, inputs, numOutputs) {
        var _this = this;
        var outputMetadata = this.binding.executeOp(name, opAttrs, this.getInputTensorIds(inputs), numOutputs);
        return outputMetadata.map(function (m) { return _this.createOutputTensor(m); });
    };
    NodeJSKernelBackend.prototype.numDataIds = function () {
        return this.tensorMap.numDataIds();
    };
    NodeJSKernelBackend.prototype.dispose = function () { };
    NodeJSKernelBackend.prototype.read = function (dataId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.readSync(dataId)];
            });
        });
    };
    NodeJSKernelBackend.prototype.readSync = function (dataId) {
        if (!this.tensorMap.has(dataId)) {
            throw new Error("Tensor " + dataId + " was not registered!");
        }
        var info = this.tensorMap.get(dataId);
        if (info.values != null) {
            return info.values;
        }
        else {
            return this.binding.tensorDataSync(info.id);
        }
    };
    NodeJSKernelBackend.prototype.disposeData = function (dataId) {
        // No-op if already disposed.
        if (!this.tensorMap.has(dataId)) {
            return;
        }
        var id = this.tensorMap.get(dataId).id;
        if (id != null && id >= 0) {
            this.binding.deleteTensor(id);
        }
        this.tensorMap.delete(dataId);
    };
    NodeJSKernelBackend.prototype.move = function (dataId, values, shape, dtype) {
        this.tensorMap.set(dataId, { shape: shape, dtype: getTFDType(dtype), values: values, id: -1 });
    };
    NodeJSKernelBackend.prototype.write = function (values, shape, dtype) {
        var dataId = {};
        this.move(dataId, values, shape, dtype);
        return dataId;
    };
    NodeJSKernelBackend.prototype.fill = function (shape, value, dtype) {
        // TODO(cais, nkreeger): Investigate whether this can be made into
        // a dtype helper method. The underlying op kernel doesn't accept undefined
        // or null dtype.
        if (dtype == null) {
            if (typeof value === 'number') {
                dtype = 'float32';
            }
            else {
                dtype = 'string';
            }
        }
        var shapeTensor = tfjs_1.tensor1d(shape, 'int32');
        var valueTensor = tfjs_1.scalar(value, dtype);
        var opAttrs = [
            {
                name: 'T',
                type: this.binding.TF_ATTR_TYPE,
                value: this.getDTypeInteger(dtype)
            },
            {
                name: 'index_type',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_INT32
            }
        ];
        return this.executeSingleOutput('Fill', opAttrs, [shapeTensor, valueTensor]);
    };
    NodeJSKernelBackend.prototype.onesLike = function (x) {
        var opAttrs = [{
                name: 'T',
                type: this.binding.TF_ATTR_TYPE,
                value: this.getDTypeInteger(x.dtype)
            }];
        return this.executeSingleOutput('OnesLike', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.zerosLike = function (x) {
        var opAttrs = [{
                name: 'T',
                type: this.binding.TF_ATTR_TYPE,
                value: this.getDTypeInteger(x.dtype)
            }];
        return this.executeSingleOutput('ZerosLike', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.stridedSlice = function (x, begin, end, strides) {
        var beginTensor = tfjs_1.tensor1d(begin, 'int32');
        for (var axis = 0; axis < end.length; axis++) {
            // Unlike Numpy, when the strides are negative, TF C uses -n-1 instead of
            // -1 as the "end" in order to include the first element.
            if (strides[axis] < 0 && end[axis] === -1) {
                end[axis] -= x.shape[axis];
            }
        }
        var endTensor = tfjs_1.tensor1d(end, 'int32');
        var stridesTensor = tfjs_1.tensor1d(strides, 'int32');
        // All of the masks have already been accounted for in the high level op,
        // so the backend does NOT need to deal with masks.
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Index', 'int32'),
            { name: 'begin_mask', type: this.binding.TF_ATTR_INT, value: 0 },
            { name: 'end_mask', type: this.binding.TF_ATTR_INT, value: 0 },
            { name: 'ellipsis_mask', type: this.binding.TF_ATTR_INT, value: 0 },
            { name: 'new_axis_mask', type: this.binding.TF_ATTR_INT, value: 0 },
            { name: 'shrink_axis_mask', type: this.binding.TF_ATTR_INT, value: 0 }
        ];
        return this.executeSingleOutput('StridedSlice', opAttrs, [x, beginTensor, endTensor, stridesTensor]);
    };
    NodeJSKernelBackend.prototype.unstack = function (x, axis) {
        if (axis >= x.shape.length) {
            throw new Error("Invalid axis supplied: " + axis + " shape length: " + x.shape.length);
        }
        var num = x.shape[axis];
        var opAttrs = [
            { name: 'num', type: this.binding.TF_ATTR_INT, value: num },
            createTypeOpAttr('T', x.dtype),
            { name: 'axis', type: this.binding.TF_ATTR_INT, value: axis }
        ];
        return this.executeMultipleOutputs('Unpack', opAttrs, [x], num);
    };
    NodeJSKernelBackend.prototype.batchMatMul = function (a, b, transposeA, transposeB) {
        var opAttrs = [
            createTypeOpAttr('T', a.dtype),
            { name: 'adj_x', type: this.binding.TF_ATTR_BOOL, value: transposeA },
            { name: 'adj_y', type: this.binding.TF_ATTR_BOOL, value: transposeB }
        ];
        return this.executeSingleOutput('BatchMatMul', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.applyActivation = function (input, activation, preluActivationWeights) {
        var result = input;
        if (activation != null) {
            if (activation === 'linear') {
                // No-op
            }
            else if (activation === 'relu') {
                result = this.relu(result);
            }
            else if (activation === 'prelu') {
                result = this.prelu(result, preluActivationWeights);
            }
            else if (activation === 'elu') {
                result = this.elu(result);
            }
            else if (activation === 'relu6') {
                result = this.relu6(result);
            }
            else {
                throw new Error("Activation: " + activation + " has not been implemented for the Node.js backend");
            }
        }
        return result;
    };
    NodeJSKernelBackend.prototype.fusedConv2d = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        var result = this.conv2d(input, filter, convInfo);
        if (bias != null) {
            result = this.add(result, bias);
        }
        result = this.applyActivation(result, activation, preluActivationWeights);
        return result;
    };
    NodeJSKernelBackend.prototype.fusedBatchMatMul = function (_a) {
        var a = _a.a, b = _a.b, transposeA = _a.transposeA, transposeB = _a.transposeB, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        // Core TensorFlow does not have a fused BatchMatMul op. Combine calls to
        // achieve the same results:
        var result = this.batchMatMul(a, b, transposeA, transposeB);
        if (bias != null) {
            result = this.add(result, bias);
        }
        result = this.applyActivation(result, activation, preluActivationWeights);
        return result;
    };
    NodeJSKernelBackend.prototype.slice = function (x, begin, size) {
        var opAttrs = [createTypeOpAttr('T', x.dtype), createTypeOpAttr('Index', 'int32')];
        // Bind tensor values
        var beginTensor = tfjs_1.tensor1d(begin, 'int32');
        var sizeTensor = tfjs_1.tensor1d(size, 'int32');
        return this.executeSingleOutput('Slice', opAttrs, [x, beginTensor, sizeTensor]);
    };
    NodeJSKernelBackend.prototype.reverse = function (a, axis) {
        var opAttrs = [createTypeOpAttr('Tidx', 'int32'), createTypeOpAttr('T', a.dtype)];
        var axisTensor = tfjs_1.tensor1d(axis, 'int32');
        return this.executeSingleOutput('ReverseV2', opAttrs, [a, axisTensor]);
    };
    NodeJSKernelBackend.prototype.concat = function (tensors, axis) {
        var opAttrs = [
            { name: 'N', type: this.binding.TF_ATTR_INT, value: tensors.length }, {
                name: 'Tidx',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_INT32
            },
            createTensorsTypeOpAttr('T', tensors)
        ];
        var inputs = Array.from(tensors);
        inputs.push(tfjs_1.scalar(axis, 'int32'));
        return this.executeSingleOutput('ConcatV2', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.neg = function (a) {
        return this.executeSingleInput('Neg', a);
    };
    NodeJSKernelBackend.prototype.diag = function (x) {
        return this.executeSingleInput('Diag', x);
    };
    NodeJSKernelBackend.prototype.add = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Add', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.select = function (condition, a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Select', opAttrs, [condition, a, b]);
    };
    NodeJSKernelBackend.prototype.addN = function (tensors) {
        var opAttrs = [
            createTypeOpAttr('T', tensors[0].dtype),
            { name: 'N', type: this.binding.TF_ATTR_INT, value: tensors.length }
        ];
        return this.executeSingleOutput('AddN', opAttrs, tensors);
    };
    NodeJSKernelBackend.prototype.subtract = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Sub', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.multiply = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Mul', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.realDivide = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('RealDiv', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.floorDiv = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('FloorDiv', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.divide = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Div', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.divNoNan = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('DivNoNan', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.unsortedSegmentSum = function (x, segmentIds, numSegments) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tindices', 'int32'),
            createTypeOpAttr('Tnumsegments', 'int32')
        ];
        return this.executeSingleOutput('UnsortedSegmentSum', opAttrs, [x, segmentIds, tfjs_1.scalar(numSegments, 'int32')]);
    };
    NodeJSKernelBackend.prototype.sum = function (x, axes) {
        var axisTensor = tfjs_1.tensor1d(axes, 'int32');
        return this.executeSingleOutput('Sum', this.createReductionOpAttrs(x), [x, axisTensor]);
    };
    NodeJSKernelBackend.prototype.prod = function (x, axes) {
        var axesTensor = tfjs_1.tensor1d(axes, 'int32');
        var opAttrs = [
            { name: 'keep_dims', type: this.binding.TF_ATTR_BOOL, value: false },
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tidx', 'int32')
        ];
        return this.executeSingleOutput('Prod', opAttrs, [x, axesTensor]);
    };
    NodeJSKernelBackend.prototype.argMin = function (x, axis) {
        var xInput = x.dtype === 'bool' ? x.toInt() : x;
        var axisScalar = tfjs_1.scalar(axis, 'int32');
        var opAttrs = [
            createTypeOpAttr('T', xInput.dtype), createTypeOpAttr('Tidx', 'int32'),
            createTypeOpAttr('output_type', 'int32')
        ];
        return this.executeSingleOutput('ArgMin', opAttrs, [xInput, axisScalar]);
    };
    NodeJSKernelBackend.prototype.argMax = function (x, axis) {
        var xInput = x.dtype === 'bool' ? x.toInt() : x;
        var axisScalar = tfjs_1.scalar(axis, 'int32');
        var opAttrs = [
            createTypeOpAttr('T', xInput.dtype), createTypeOpAttr('Tidx', 'int32'),
            createTypeOpAttr('output_type', 'int32')
        ];
        return this.executeSingleOutput('ArgMax', opAttrs, [xInput, axisScalar]);
    };
    NodeJSKernelBackend.prototype.equal = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Equal', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.notEqual = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('NotEqual', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.less = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Less', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.lessEqual = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('LessEqual', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.greater = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Greater', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.greaterEqual = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('GreaterEqual', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.logicalNot = function (a) {
        return this.executeSingleOutput('LogicalNot', [], [a]);
    };
    NodeJSKernelBackend.prototype.logicalAnd = function (a, b) {
        return this.executeSingleOutput('LogicalAnd', [], [a, b]);
    };
    NodeJSKernelBackend.prototype.logicalOr = function (a, b) {
        return this.executeSingleOutput('LogicalOr', [], [a, b]);
    };
    NodeJSKernelBackend.prototype.where = function (condition) {
        return this.executeSingleOutput('Where', [], [condition]);
    };
    NodeJSKernelBackend.prototype.topKValues = function (x, k) {
        throw new Error('Method not implemented.');
    };
    NodeJSKernelBackend.prototype.topKIndices = function (x, k) {
        throw new Error('Method not implemented.');
    };
    NodeJSKernelBackend.prototype.topk = function (x, k, sorted) {
        var kCount = util_1.isNullOrUndefined(k) ? 1 : k;
        var isSorted = util_1.isNullOrUndefined(sorted) ? true : sorted;
        var opAttrs = [
            { name: 'sorted', type: this.binding.TF_ATTR_BOOL, value: isSorted },
            createTypeOpAttr('T', x.dtype),
        ];
        var kTensor = tfjs_1.scalar(kCount, 'int32');
        // 'TopKV2' has two-hard coded output attributes:
        return this.executeMultipleOutputs('TopKV2', opAttrs, [x, kTensor], 2);
    };
    NodeJSKernelBackend.prototype.min = function (x, axes) {
        var axesTensor = tfjs_1.tensor1d(axes, 'int32');
        return this.executeSingleOutput('Min', this.createReductionOpAttrs(x), [x, axesTensor]);
    };
    NodeJSKernelBackend.prototype.minimum = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Minimum', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.max = function (x, axes) {
        var axesTensor = tfjs_1.tensor1d(axes, 'int32');
        return this.executeSingleOutput('Max', this.createReductionOpAttrs(x), [x, axesTensor]);
    };
    NodeJSKernelBackend.prototype.maximum = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', tfjs_1.backend_util.upcastType(a.dtype, b.dtype))];
        return this.executeSingleOutput('Maximum', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.all = function (x, axes) {
        var opAttrs = [
            { name: 'keep_dims', type: this.binding.TF_ATTR_BOOL, value: false },
            createTypeOpAttr('Tidx', 'int32')
        ];
        var axesTensor = tfjs_1.tensor1d(axes, 'int32');
        return this.executeSingleOutput('All', opAttrs, [x, axesTensor]);
    };
    NodeJSKernelBackend.prototype.any = function (x, axes) {
        var opAttrs = [
            { name: 'keep_dims', type: this.binding.TF_ATTR_BOOL, value: false },
            createTypeOpAttr('Tidx', 'int32')
        ];
        var axesTensor = tfjs_1.tensor1d(axes, 'int32');
        return this.executeSingleOutput('Any', opAttrs, [x, axesTensor]);
    };
    NodeJSKernelBackend.prototype.ceil = function (x) {
        return this.executeSingleInput('Ceil', x);
    };
    NodeJSKernelBackend.prototype.floor = function (x) {
        return this.executeSingleInput('Floor', x);
    };
    NodeJSKernelBackend.prototype.pow = function (a, b) {
        var dtype = tfjs_1.backend_util.upcastType(a.dtype, b.dtype);
        var opAttrs = [createTypeOpAttr('T', dtype)];
        return this.executeSingleOutput('Pow', opAttrs, [a.cast(dtype), b.cast(dtype)]);
    };
    NodeJSKernelBackend.prototype.exp = function (x) {
        var xTensor = x.dtype === 'int32' ? x.toFloat() : x;
        return this.executeSingleInput('Exp', xTensor);
    };
    NodeJSKernelBackend.prototype.log = function (x) {
        return this.executeSingleInput('Log', x);
    };
    NodeJSKernelBackend.prototype.log1p = function (x) {
        return this.executeSingleInput('Log1p', x);
    };
    NodeJSKernelBackend.prototype.sqrt = function (x) {
        return this.executeSingleInput('Sqrt', x);
    };
    NodeJSKernelBackend.prototype.square = function (x) {
        return this.executeSingleInput('Square', x);
    };
    NodeJSKernelBackend.prototype.relu = function (x) {
        return this.executeSingleInput('Relu', x);
    };
    NodeJSKernelBackend.prototype.relu6 = function (x) {
        return this.executeSingleInput('Relu6', x);
    };
    NodeJSKernelBackend.prototype.prelu = function (x, a) {
        var pos = this.relu(x);
        var neg = a.mul(x.sub(this.abs(x))).mul(0.5);
        return pos.add(neg);
    };
    NodeJSKernelBackend.prototype.elu = function (x) {
        return this.executeSingleInput('Elu', x);
    };
    NodeJSKernelBackend.prototype.eluDer = function (dy, y) {
        var opAttrs = [createTypeOpAttr('T', y.dtype)];
        return this.executeSingleOutput('EluGrad', opAttrs, [dy, y]);
    };
    NodeJSKernelBackend.prototype.selu = function (x) {
        return this.executeSingleInput('Selu', x);
    };
    NodeJSKernelBackend.prototype.int = function (x) {
        throw new Error('Method not implemented.');
    };
    NodeJSKernelBackend.prototype.clip = function (x, min, max) {
        var xMin = this.minimum(x, tfjs_1.scalar(max));
        return this.maximum(xMin, tfjs_1.scalar(min));
    };
    NodeJSKernelBackend.prototype.abs = function (x) {
        return this.executeSingleInput('Abs', x);
    };
    NodeJSKernelBackend.prototype.complexAbs = function (x) {
        var opAttrs = [createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tout', 'float32')];
        return this.executeSingleOutput('ComplexAbs', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.sigmoid = function (x) {
        return this.executeSingleInput('Sigmoid', x);
    };
    NodeJSKernelBackend.prototype.sin = function (x) {
        return this.executeSingleInput('Sin', x);
    };
    NodeJSKernelBackend.prototype.cos = function (x) {
        return this.executeSingleInput('Cos', x);
    };
    NodeJSKernelBackend.prototype.tan = function (x) {
        return this.executeSingleInput('Tan', x);
    };
    NodeJSKernelBackend.prototype.asin = function (x) {
        return this.executeSingleInput('Asin', x);
    };
    NodeJSKernelBackend.prototype.acos = function (x) {
        return this.executeSingleInput('Acos', x);
    };
    NodeJSKernelBackend.prototype.atan = function (x) {
        return this.executeSingleInput('Atan', x);
    };
    NodeJSKernelBackend.prototype.sinh = function (x) {
        return this.executeSingleInput('Sinh', x);
    };
    NodeJSKernelBackend.prototype.cosh = function (x) {
        return this.executeSingleInput('Cosh', x);
    };
    NodeJSKernelBackend.prototype.tanh = function (x) {
        return this.executeSingleInput('Tanh', x);
    };
    NodeJSKernelBackend.prototype.mod = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', a.dtype)];
        return this.executeSingleOutput('FloorMod', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.round = function (x) {
        return this.executeSingleInput('Round', x);
    };
    NodeJSKernelBackend.prototype.sign = function (x) {
        return this.executeSingleInput('Sign', x);
    };
    NodeJSKernelBackend.prototype.isNaN = function (x) {
        return this.executeSingleInput('IsNan', x);
    };
    NodeJSKernelBackend.prototype.isInf = function (x) {
        return this.executeSingleInput('IsInf', x);
    };
    NodeJSKernelBackend.prototype.isFinite = function (x) {
        return this.executeSingleInput('IsFinite', x);
    };
    NodeJSKernelBackend.prototype.rsqrt = function (x) {
        return this.executeSingleInput('Rsqrt', x);
    };
    NodeJSKernelBackend.prototype.reciprocal = function (x) {
        return this.executeSingleInput('Reciprocal', x);
    };
    NodeJSKernelBackend.prototype.asinh = function (x) {
        return this.executeSingleInput('Asinh', x);
    };
    NodeJSKernelBackend.prototype.acosh = function (x) {
        return this.executeSingleInput('Acosh', x);
    };
    NodeJSKernelBackend.prototype.atanh = function (x) {
        return this.executeSingleInput('Atanh', x);
    };
    NodeJSKernelBackend.prototype.erf = function (x) {
        return this.executeSingleInput('Erf', x);
    };
    NodeJSKernelBackend.prototype.squaredDifference = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', a.dtype)];
        return this.executeSingleOutput('SquaredDifference', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.expm1 = function (x) {
        return this.executeSingleInput('Expm1', x);
    };
    NodeJSKernelBackend.prototype.softplus = function (x) {
        return this.executeSingleInput('Softplus', x);
    };
    NodeJSKernelBackend.prototype.atan2 = function (a, b) {
        var opAttrs = [createTypeOpAttr('T', a.dtype)];
        return this.executeSingleOutput('Atan2', opAttrs, [a, b]);
    };
    NodeJSKernelBackend.prototype.step = function (x, alpha) {
        var dtype = x.dtype;
        var nans = this.isNaN(x);
        var stepNoNans = this.select(this.greater(x, tfjs_1.scalar(0, dtype)), tfjs_1.ones(x.shape), tfjs_1.fill(x.shape, alpha, dtype));
        return this.select(nans, x, stepNoNans);
    };
    NodeJSKernelBackend.prototype.conv2d = function (x, filter, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'use_cudnn_on_gpu', type: this.binding.TF_ATTR_BOOL, value: true },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations },
        ];
        return this.executeSingleOutput('Conv2D', opAttrs, [x, filter]);
    };
    NodeJSKernelBackend.prototype.conv2dDerInput = function (dy, filter, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', 'float32'),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'use_cudnn_on_gpu', type: this.binding.TF_ATTR_BOOL, value: true },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        var inputSizes = tfjs_1.tensor1d(convInfo.inShape, 'int32');
        return this.executeSingleOutput('Conv2DBackpropInput', opAttrs, [inputSizes, filter, dy]);
    };
    NodeJSKernelBackend.prototype.conv2dDerFilter = function (x, dy, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', 'float32'),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'use_cudnn_on_gpu', type: this.binding.TF_ATTR_BOOL, value: true },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        var filterSizes = tfjs_1.tensor1d(convInfo.filterShape, 'int32');
        return this.executeSingleOutput('Conv2DBackpropFilter', opAttrs, [x, filterSizes, dy]);
    };
    NodeJSKernelBackend.prototype.depthwiseConv2DDerInput = function (dy, filter, convInfo) {
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', 'float32'),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        var inputSizes = tfjs_1.tensor1d(convInfo.inShape, 'int32');
        return this.executeSingleOutput('DepthwiseConv2dNativeBackpropInput', opAttrs, [inputSizes, filter, dy]);
    };
    NodeJSKernelBackend.prototype.depthwiseConv2DDerFilter = function (x, dY, convInfo) {
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', 'float32'),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        var filterSizes = tfjs_1.tensor1d(convInfo.filterShape, 'int32');
        return this.executeSingleOutput('DepthwiseConv2dNativeBackpropFilter', opAttrs, [x, filterSizes, dY]);
    };
    NodeJSKernelBackend.prototype.fusedDepthwiseConv2D = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        var result = this.depthwiseConv2D(input, filter, convInfo);
        if (bias != null) {
            result = this.add(result, bias);
        }
        result = this.applyActivation(result, activation, preluActivationWeights);
        return result;
    };
    NodeJSKernelBackend.prototype.depthwiseConv2D = function (input, filter, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var dilations = [1, convInfo.dilationHeight, convInfo.dilationWidth, 1];
        var opAttrs = [
            createTypeOpAttr('T', input.dtype),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        return this.executeSingleOutput('DepthwiseConv2dNative', opAttrs, [input, filter]);
    };
    NodeJSKernelBackend.prototype.conv3d = function (x, filter, convInfo) {
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        if (!this.isGPUPackage && convInfo.dilationDepth > 1) {
            throw new Error('CPU Dilation depth must be 1');
        }
        var dilations = [
            1, convInfo.dilationDepth, convInfo.dilationHeight,
            convInfo.dilationWidth, 1
        ];
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        return this.executeSingleOutput('Conv3D', opAttrs, [x, filter]);
    };
    NodeJSKernelBackend.prototype.conv3dDerInput = function (dy, filter, convInfo) {
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        if (!this.isGPUPackage && convInfo.dilationDepth > 1) {
            throw new Error('CPU Dilation depth must be 1');
        }
        var dilations = [
            1, convInfo.dilationDepth, convInfo.dilationHeight,
            convInfo.dilationWidth, 1
        ];
        var opAttrs = [
            createTypeOpAttr('T', dy.dtype),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations },
            createTypeOpAttr('Tshape', 'int32')
        ];
        var inputSizes = tfjs_1.tensor1d(convInfo.inShape, 'int32');
        return this.executeSingleOutput('Conv3DBackpropInputV2', opAttrs, [inputSizes, filter, dy]);
    };
    NodeJSKernelBackend.prototype.conv3dDerFilter = function (x, dY, convInfo) {
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        if (!this.isGPUPackage && convInfo.dilationDepth > 1) {
            throw new Error('CPU Dilation depth must be 1');
        }
        var dilations = [
            1, convInfo.dilationDepth, convInfo.dilationHeight,
            convInfo.dilationWidth, 1
        ];
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'dilations', type: this.binding.TF_ATTR_INT, value: dilations }
        ];
        var filterSizes = tfjs_1.tensor1d(convInfo.filterShape, 'int32');
        return this.executeSingleOutput('Conv3DBackpropFilterV2', opAttrs, [x, filterSizes, dY]);
    };
    NodeJSKernelBackend.prototype.maxPool = function (x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var ksize = [1, convInfo.filterHeight, convInfo.filterWidth, 1];
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            }
        ];
        return this.executeSingleOutput('MaxPool', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.maxPoolBackprop = function (dy, x, y, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding type was " + convInfo.padInfo.type));
        }
        var ksize = [1, convInfo.filterHeight, convInfo.filterWidth, 1];
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        return this.executeSingleOutput('MaxPoolGrad', opAttrs, [x, y, dy]);
    };
    NodeJSKernelBackend.prototype.avgPool = function (x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var ksize = [1, convInfo.filterHeight, convInfo.filterWidth, 1];
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        return this.executeSingleOutput('AvgPool', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.avgPoolBackprop = function (dy, x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding type was " + convInfo.padInfo.type));
        }
        var ksize = [1, convInfo.filterHeight, convInfo.filterWidth, 1];
        var strides = [1, convInfo.strideHeight, convInfo.strideWidth, 1];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NHWC' : 'NCHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        var origInputShape = tfjs_1.tensor1d(x.shape, 'int32');
        return this.executeSingleOutput('AvgPoolGrad', opAttrs, [origInputShape, dy]);
    };
    NodeJSKernelBackend.prototype.avgPool3d = function (x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var ksize = [
            1, convInfo.filterDepth, convInfo.filterHeight, convInfo.filterWidth, 1
        ];
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        return this.executeSingleOutput('AvgPool3D', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.avgPool3dBackprop = function (dy, x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding type was " + convInfo.padInfo.type));
        }
        var ksize = [
            1, convInfo.filterDepth, convInfo.filterHeight, convInfo.filterWidth, 1
        ];
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        var origInputShape = tfjs_1.tensor1d(x.shape, 'int32');
        return this.executeSingleOutput('AvgPool3DGrad', opAttrs, [origInputShape, dy]);
    };
    NodeJSKernelBackend.prototype.maxPool3d = function (x, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding was " + convInfo.padInfo.type));
        }
        var ksize = [
            1, convInfo.filterDepth, convInfo.filterHeight, convInfo.filterWidth, 1
        ];
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding }, {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            }
        ];
        return this.executeSingleOutput('MaxPool3D', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.maxPool3dBackprop = function (dy, x, y, convInfo) {
        if (convInfo.padInfo.type !== 'VALID' && convInfo.padInfo.type !== 'SAME') {
            throw new Error("TF Backend supports only 'valid' and 'same' padding " +
                ("while padding type was " + convInfo.padInfo.type));
        }
        var ksize = [
            1, convInfo.filterDepth, convInfo.filterHeight, convInfo.filterWidth, 1
        ];
        var strides = [
            1, convInfo.strideDepth, convInfo.strideHeight, convInfo.strideWidth, 1
        ];
        var padding = convInfo.padInfo.type;
        var dataFormat = convInfo.dataFormat === 'channelsLast' ? 'NDHWC' : 'NCDHW';
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'ksize', type: this.binding.TF_ATTR_INT, value: ksize },
            { name: 'strides', type: this.binding.TF_ATTR_INT, value: strides },
            { name: 'padding', type: this.binding.TF_ATTR_STRING, value: padding },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
        ];
        return this.executeSingleOutput('MaxPool3DGrad', opAttrs, [x, y, dy]);
    };
    NodeJSKernelBackend.prototype.reshape = function (x, shape) {
        var shapeTensor = tfjs_1.tensor1d(shape, 'int32');
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            createTypeOpAttr('Tshape', shapeTensor.dtype)
        ];
        return this.executeSingleOutput('Reshape', opAttrs, [x, shapeTensor]);
    };
    NodeJSKernelBackend.prototype.cast = function (x, dtype) {
        var opAttrs = [
            createTypeOpAttr('SrcT', x.dtype), createTypeOpAttr('DstT', dtype),
            { name: 'Truncate', type: this.binding.TF_ATTR_BOOL, value: false }
        ];
        return this.executeSingleOutput('Cast', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.tile = function (x, reps) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tmultiples', 'int32')
        ];
        var multiples = tfjs_1.tensor1d(reps, 'int32');
        return this.executeSingleOutput('Tile', opAttrs, [x, multiples]);
    };
    NodeJSKernelBackend.prototype.pad = function (x, paddings, constantValue) {
        // Bind tensor values
        var paddingsTensor = tfjs_1.tensor2d(paddings, [paddings.length, 2], 'int32');
        var constantTensor = tfjs_1.scalar(constantValue, x.dtype);
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            createTypeOpAttr('Tpaddings', paddingsTensor.dtype)
        ];
        return this.executeSingleOutput('PadV2', opAttrs, [x, paddingsTensor, constantTensor]);
    };
    NodeJSKernelBackend.prototype.transpose = function (x, perm) {
        var permTensor = tfjs_1.tensor1d(perm, 'int32');
        var opAttrs = [createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tperm', 'int32')];
        return this.executeSingleOutput('Transpose', opAttrs, [x, permTensor]);
    };
    NodeJSKernelBackend.prototype.gather = function (x, indices, axis) {
        var axisTensor = tfjs_1.scalar(axis, 'int32');
        var opAttrs = [
            createTypeOpAttr('Tparams', x.dtype),
            createTypeOpAttr('Tindices', indices.dtype),
            createTypeOpAttr('Taxis', 'int32')
        ];
        return this.executeSingleOutput('GatherV2', opAttrs, [x, indices, axisTensor]);
    };
    NodeJSKernelBackend.prototype.gatherND = function (x, indices) {
        var opAttrs = [
            createTypeOpAttr('Tparams', x.dtype),
            createTypeOpAttr('Tindices', 'int32')
        ];
        return this.executeSingleOutput('GatherNd', opAttrs, [x, indices]);
    };
    NodeJSKernelBackend.prototype.scatterND = function (indices, updates, shape) {
        var opAttrs = [
            createTypeOpAttr('T', updates.dtype),
            createTypeOpAttr('Tindices', 'int32')
        ];
        var shapeTensor = tfjs_1.tensor1d(shape, 'int32');
        return this.executeSingleOutput('ScatterNd', opAttrs, [indices, updates, shapeTensor]);
    };
    NodeJSKernelBackend.prototype.batchToSpaceND = function (x, blockShape, crops) {
        var blockShapeTensor = tfjs_1.tensor1d(blockShape, 'int32');
        var cropsTensor = tfjs_1.tensor2d(crops, [crops.length, crops[0].length], 'int32');
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tblock_shape', 'int32'),
            createTypeOpAttr('Tcrops', cropsTensor.dtype)
        ];
        return this.executeSingleOutput('BatchToSpaceND', opAttrs, [x, blockShapeTensor, cropsTensor]);
    };
    NodeJSKernelBackend.prototype.spaceToBatchND = function (x, blockShape, paddings) {
        var blockShapeTensor = tfjs_1.tensor1d(blockShape, 'int32');
        var paddingsTensor = tfjs_1.tensor2d(paddings, [paddings.length, paddings[0].length], 'int32');
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tblock_shape', 'int32'),
            createTypeOpAttr('Tpaddings', paddingsTensor.dtype)
        ];
        return this.executeSingleOutput('SpaceToBatchND', opAttrs, [x, blockShapeTensor, paddingsTensor]);
    };
    NodeJSKernelBackend.prototype.resizeBilinear = function (x, newHeight, newWidth, alignCorners) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            {
                name: 'align_corners',
                type: this.binding.TF_ATTR_BOOL,
                value: alignCorners
            },
        ];
        var size = tfjs_1.tensor1d([newHeight, newWidth], 'int32');
        return this.executeSingleOutput('ResizeBilinear', opAttrs, [x, size]);
    };
    NodeJSKernelBackend.prototype.resizeBilinearBackprop = function (dy, x, alignCorners) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), {
                name: 'align_corners',
                type: this.binding.TF_ATTR_BOOL,
                value: alignCorners
            }
        ];
        return this.executeSingleOutput('ResizeBilinearGrad', opAttrs, [dy, x]);
    };
    NodeJSKernelBackend.prototype.resizeNearestNeighbor = function (x, newHeight, newWidth, alignCorners) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            {
                name: 'align_corners',
                type: this.binding.TF_ATTR_BOOL,
                value: alignCorners
            },
        ];
        var size = tfjs_1.tensor1d([newHeight, newWidth], 'int32');
        return this.executeSingleOutput('ResizeNearestNeighbor', opAttrs, [x, size]);
    };
    NodeJSKernelBackend.prototype.resizeNearestNeighborBackprop = function (dy, x, alignCorners) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype), {
                name: 'align_corners',
                type: this.binding.TF_ATTR_BOOL,
                value: alignCorners
            }
        ];
        var _a = x.shape, origHeight = _a[1], origWidth = _a[2];
        var size = tfjs_1.tensor1d([origHeight, origWidth], 'int32');
        return this.executeSingleOutput('ResizeNearestNeighborGrad', opAttrs, [dy, size]);
    };
    NodeJSKernelBackend.prototype.batchNormalization = function (x, mean, variance, varianceEpsilon, scale, offset) {
        if (mean.rank > 1) {
            // Fused batch norm doesn't work with high-dim mean/var/scale/offset.
            var inv = tfjs_1.rsqrt(variance.add(tfjs_1.scalar(varianceEpsilon)));
            if (scale != null) {
                inv = inv.mul(scale);
            }
            var xNorm = x.sub(mean).mul(inv);
            return offset != null ? xNorm.add(offset) : xNorm;
        }
        var dataFormat = 'NHWC';
        var depth = x.shape[3];
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            {
                name: 'epsilon',
                type: this.binding.TF_ATTR_FLOAT,
                value: varianceEpsilon
            },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            },
            { name: 'is_training', type: this.binding.TF_ATTR_BOOL, value: false },
        ];
        var numOutputs = 5;
        if (scale == null) {
            scale = tfjs_1.fill([depth], 1);
        }
        if (offset == null) {
            offset = tfjs_1.fill([depth], 0);
        }
        return this.executeMultipleOutputs('FusedBatchNorm', opAttrs, [x, scale, offset, mean, variance], numOutputs)[0];
    };
    NodeJSKernelBackend.prototype.localResponseNormalization4D = function (x, radius, bias, alpha, beta) {
        var opAttrs = [
            createTypeOpAttr('T', x.dtype),
            { name: 'depth_radius', type: this.binding.TF_ATTR_INT, value: radius },
            { name: 'bias', type: this.binding.TF_ATTR_FLOAT, value: bias },
            { name: 'alpha', type: this.binding.TF_ATTR_FLOAT, value: alpha },
            { name: 'beta', type: this.binding.TF_ATTR_FLOAT, value: beta },
        ];
        return this.executeSingleOutput('LRN', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.LRNGrad = function (dy, inputImage, outputImage, radius, bias, alpha, beta) {
        var opAttrs = [
            createTypeOpAttr('T', dy.dtype),
            { name: 'depth_radius', type: this.binding.TF_ATTR_INT, value: radius },
            { name: 'bias', type: this.binding.TF_ATTR_FLOAT, value: bias },
            { name: 'alpha', type: this.binding.TF_ATTR_FLOAT, value: alpha },
            { name: 'beta', type: this.binding.TF_ATTR_FLOAT, value: beta },
        ];
        return this.executeSingleOutput('LRNGrad', opAttrs, [dy, inputImage, outputImage]);
    };
    NodeJSKernelBackend.prototype.multinomial = function (logits, normalized, numSamples, seed) {
        if (normalized) {
            throw new Error('TF Node backend does not support normalized logits ' +
                'passed to multinomial');
        }
        var opAttrs = [
            createTypeOpAttr('T', logits.dtype),
            createTypeOpAttr('output_dtype', 'int32'),
            { name: 'seed', type: this.binding.TF_ATTR_INT, value: seed },
            { name: 'seed2', type: this.binding.TF_ATTR_INT, value: seed * seed },
        ];
        return this.executeSingleOutput('Multinomial', opAttrs, [logits, tfjs_1.scalar(numSamples, 'int32')]);
    };
    NodeJSKernelBackend.prototype.oneHot = function (indices, depth, onValue, offValue) {
        var depthTensor = tfjs_1.scalar(depth, 'int32');
        var onValueTensor = tfjs_1.scalar(onValue, 'int32');
        var offValueTensor = tfjs_1.scalar(offValue, 'int32');
        var opAttrs = [
            { name: 'axis', type: this.binding.TF_ATTR_INT, value: -1 },
            createTypeOpAttr('T', indices.dtype),
            createTypeOpAttr('TI', indices.dtype)
        ];
        return this.executeSingleOutput('OneHot', opAttrs, [
            indices, depthTensor, onValueTensor, offValueTensor
        ]);
    };
    NodeJSKernelBackend.prototype.cumsum = function (x, axis, exclusive, reverse) {
        var axisTensor = tfjs_1.scalar(axis, 'int32');
        var opAttrs = [
            { name: 'exclusive', type: this.binding.TF_ATTR_BOOL, value: exclusive },
            { name: 'reverse', type: this.binding.TF_ATTR_BOOL, value: reverse },
            createTypeOpAttr('T', x.dtype), createTypeOpAttr('Tidx', 'int32')
        ];
        return this.executeSingleOutput('Cumsum', opAttrs, [x, axisTensor]);
    };
    NodeJSKernelBackend.prototype.nonMaxSuppression = function (boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
        var opAttrs = [createTypeOpAttr('T', boxes.dtype)];
        var maxOutputSizeTensor = tfjs_1.scalar(maxOutputSize, 'int32');
        var iouThresholdTensor = tfjs_1.scalar(iouThreshold);
        var scoreThresholdTensor = tfjs_1.scalar(scoreThreshold);
        return this.executeSingleOutput('NonMaxSuppressionV3', opAttrs, [
            boxes, scores, maxOutputSizeTensor, iouThresholdTensor,
            scoreThresholdTensor
        ]);
    };
    NodeJSKernelBackend.prototype.fft = function (x) {
        var opAttrs = [createTypeOpAttr('Tcomplex', x.dtype)];
        return this.executeSingleOutput('FFT', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.ifft = function (x) {
        var opAttrs = [createTypeOpAttr('Tcomplex', x.dtype)];
        return this.executeSingleOutput('IFFT', opAttrs, [x]);
    };
    NodeJSKernelBackend.prototype.complex = function (real, imag) {
        var opAttrs = [
            createTensorsTypeOpAttr('T', real),
            {
                name: 'Tout',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_COMPLEX64
            },
        ];
        var inputs = [real, imag];
        return this.executeSingleOutput('Complex', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.real = function (input) {
        var opAttrs = [
            createTensorsTypeOpAttr('T', input), {
                name: 'Tout',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_FLOAT
            }
        ];
        var inputs = [input];
        return this.executeSingleOutput('Real', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.imag = function (input) {
        var opAttrs = [
            {
                name: 'T',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_COMPLEX64
            },
            {
                name: 'Tout',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_FLOAT
            }
        ];
        var inputs = [input];
        return this.executeSingleOutput('Imag', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.cropAndResize = function (image, boxes, boxIndex, cropSize, method, extrapolationValue) {
        var opAttrs = [
            createTypeOpAttr('T', image.dtype),
            { name: 'method', type: this.binding.TF_ATTR_STRING, value: method }, {
                name: 'extrapolation_value',
                type: this.binding.TF_ATTR_FLOAT,
                value: extrapolationValue
            }
        ];
        var cropSizeTensor = tfjs_1.tensor1d(cropSize, 'int32');
        return this.executeSingleOutput('CropAndResize', opAttrs, [image, boxes, boxIndex, cropSizeTensor]);
    };
    NodeJSKernelBackend.prototype.depthToSpace = function (x, blockSize, dataFormat) {
        var opAttrs = [
            createTensorsTypeOpAttr('T', x), {
                name: 'block_size',
                type: this.binding.TF_ATTR_INT,
                value: blockSize < 2 ? 2 : blockSize
            },
            {
                name: 'data_format',
                type: this.binding.TF_ATTR_STRING,
                value: dataFormat
            }
        ];
        var inputs = [x];
        return this.executeSingleOutput('DepthToSpace', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.split = function (value, sizeSplits, axis) {
        var opAttrs = [
            {
                name: 'num_split',
                type: this.binding.TF_ATTR_INT,
                value: sizeSplits.length
            },
            createTensorsTypeOpAttr('T', value), {
                name: 'Tlen',
                type: this.binding.TF_ATTR_TYPE,
                value: this.binding.TF_INT32
            }
        ];
        var inputs = [value];
        inputs.push(tfjs_1.tensor1d(sizeSplits, 'int32'));
        inputs.push(tfjs_1.scalar(axis, 'int32'));
        return this.executeMultipleOutputs('SplitV', opAttrs, inputs, sizeSplits.length);
    };
    NodeJSKernelBackend.prototype.sparseToDense = function (sparseIndices, sparseValues, outputShape, defaultValue) {
        var opAttrs = [
            { name: 'validate_indices', type: this.binding.TF_ATTR_BOOL, value: true },
            createTypeOpAttr('T', sparseValues.dtype),
            createTypeOpAttr('Tindices', sparseIndices.dtype)
        ];
        var outputShapeTensor = tfjs_1.tensor1d(outputShape, 'int32');
        return this.executeSingleOutput('SparseToDense', opAttrs, [
            sparseIndices, outputShapeTensor, sparseValues, defaultValue
        ]);
    };
    NodeJSKernelBackend.prototype.linspace = function (start, stop, num) {
        var opAttrs = [createTypeOpAttr('T', 'float32'), createTypeOpAttr('Tidx', 'int32')];
        var inputs = [
            tfjs_1.scalar(start, 'float32'), tfjs_1.scalar(stop, 'float32'), tfjs_1.scalar(num, 'int32')
        ];
        return this.executeSingleOutput('LinSpace', opAttrs, inputs);
    };
    NodeJSKernelBackend.prototype.decodeJpeg = function (contents, channels, ratio, fancyUpscaling, tryRecoverTruncated, acceptableFraction, dctMethod) {
        var opAttrs = [
            { name: 'channels', type: this.binding.TF_ATTR_INT, value: channels },
            { name: 'ratio', type: this.binding.TF_ATTR_INT, value: ratio }, {
                name: 'fancy_upscaling',
                type: this.binding.TF_ATTR_BOOL,
                value: fancyUpscaling
            },
            {
                name: 'try_recover_truncated',
                type: this.binding.TF_ATTR_BOOL,
                value: tryRecoverTruncated
            },
            {
                name: 'acceptable_fraction',
                type: this.binding.TF_ATTR_FLOAT,
                value: acceptableFraction
            },
            { name: 'dct_method', type: this.binding.TF_ATTR_STRING, value: dctMethod }
        ];
        var inputArgs = [tfjs_1.scalar(contents, 'string')];
        return this.executeSingleOutput('DecodeJpeg', opAttrs, inputArgs);
    };
    NodeJSKernelBackend.prototype.decodePng = function (contents, channels) {
        var opAttrs = [{ name: 'channels', type: this.binding.TF_ATTR_INT, value: channels }];
        var inputArgs = [tfjs_1.scalar(contents, 'string')];
        return this.executeSingleOutput('DecodePng', opAttrs, inputArgs);
    };
    NodeJSKernelBackend.prototype.decodeBmp = function (contents, channels) {
        var opAttrs = [{ name: 'channels', type: this.binding.TF_ATTR_INT, value: channels }];
        var inputArgs = [tfjs_1.scalar(contents, 'string')];
        return this.executeSingleOutput('DecodeBmp', opAttrs, inputArgs);
    };
    NodeJSKernelBackend.prototype.decodeGif = function (contents) {
        var inputArgs = [tfjs_1.scalar(contents, 'string')];
        return this.executeSingleOutput('DecodeGif', [], inputArgs);
    };
    NodeJSKernelBackend.prototype.executeEncodeImageOp = function (name, opAttrs, imageData, imageShape) {
        var inputTensorId = this.binding.createTensor(imageShape, this.binding.TF_UINT8, imageData);
        var outputMetadata = this.binding.executeOp(name, opAttrs, [inputTensorId], 1);
        var outputTensorInfo = outputMetadata[0];
        // prevent the tensor data from being converted to a UTF8 string, since
        // the encoded data is not valid UTF8
        outputTensorInfo.dtype = this.binding.TF_UINT8;
        return this.createOutputTensor(outputTensorInfo);
    };
    NodeJSKernelBackend.prototype.encodeJpeg = function (imageData, imageShape, format, quality, progressive, optimizeSize, chromaDownsampling, densityUnit, xDensity, yDensity, xmpMetadata) {
        var opAttrs = [
            { name: 'format', type: this.binding.TF_ATTR_STRING, value: format },
            { name: 'quality', type: this.binding.TF_ATTR_INT, value: quality }, {
                name: 'progressive',
                type: this.binding.TF_ATTR_BOOL,
                value: progressive
            },
            {
                name: 'optimize_size',
                type: this.binding.TF_ATTR_BOOL,
                value: optimizeSize
            },
            {
                name: 'chroma_downsampling',
                type: this.binding.TF_ATTR_BOOL,
                value: chromaDownsampling
            },
            {
                name: 'density_unit',
                type: this.binding.TF_ATTR_STRING,
                value: densityUnit
            },
            { name: 'x_density', type: this.binding.TF_ATTR_INT, value: xDensity },
            { name: 'y_density', type: this.binding.TF_ATTR_INT, value: yDensity }, {
                name: 'xmp_metadata',
                type: this.binding.TF_ATTR_STRING,
                value: xmpMetadata
            }
        ];
        return this.executeEncodeImageOp('EncodeJpeg', opAttrs, imageData, imageShape);
    };
    NodeJSKernelBackend.prototype.encodePng = function (imageData, imageShape, compression) {
        var opAttrs = [
            { name: 'compression', type: this.binding.TF_ATTR_INT, value: compression }
        ];
        return this.executeEncodeImageOp('EncodePng', opAttrs, imageData, imageShape);
    };
    NodeJSKernelBackend.prototype.deleteSavedModel = function (id) {
        this.binding.deleteSavedModel(id);
    };
    NodeJSKernelBackend.prototype.loadSavedModelMetaGraph = function (path, tags) {
        return this.binding.loadSavedModel(path, tags);
    };
    NodeJSKernelBackend.prototype.runSavedModel = function (id, inputs, inputOpNames, outputOpNames) {
        var _this = this;
        var outputMetadata = this.binding.runSavedModel(id, this.getInputTensorIds(inputs), inputOpNames.join(','), outputOpNames.join(','));
        return outputMetadata.map(function (m) { return _this.createOutputTensor(m); });
    };
    // ------------------------------------------------------------
    // TensorBoard-related (tfjs-node-specific) backend kernels.
    NodeJSKernelBackend.prototype.summaryWriter = function (logdir) {
        var opAttrs = [
            {
                name: 'shared_name',
                type: this.binding.TF_ATTR_STRING,
                value: "logdir:" + logdir
            },
            { name: 'container', type: this.binding.TF_ATTR_STRING, value: '' }
        ];
        var writerResource = this.executeSingleOutput('SummaryWriter', opAttrs, []);
        return writerResource;
    };
    NodeJSKernelBackend.prototype.createSummaryFileWriter = function (resourceHandle, logdir, maxQueue, flushMillis, filenameSuffix) {
        var inputArgs = [
            resourceHandle, tfjs_1.scalar(logdir),
            tfjs_1.scalar(maxQueue == null ? 10 : maxQueue, 'int32'),
            tfjs_1.scalar(flushMillis == null ? 2 * 60 * 1000 : flushMillis, 'int32'),
            tfjs_1.scalar(filenameSuffix == null ? '.v2' : filenameSuffix)
        ];
        this.executeMultipleOutputs('CreateSummaryFileWriter', [], inputArgs, 0);
    };
    NodeJSKernelBackend.prototype.writeScalarSummary = function (resourceHandle, step, name, value) {
        var _this = this;
        tfjs_1.tidy(function () {
            tfjs_1.util.assert(Number.isInteger(step), function () { return "step is expected to be an integer, but is instead " + step; });
            var inputArgs = [resourceHandle, new int64_tensors_1.Int64Scalar(step), tfjs_1.scalar(name, 'string')];
            var typeAttr;
            if (typeof value === 'number') {
                inputArgs.push(tfjs_1.scalar(value));
                typeAttr = _this.binding.TF_FLOAT;
            }
            else {
                // `value` is a Scalar.
                tfjs_1.util.assert(value.rank === 0, function () { return "A non-scalar tensor (rank " + value.rank + ") is passed to " +
                    "writeScalarSummary()"; });
                inputArgs.push(value);
                typeAttr = _this.typeAttributeFromTensor(value);
            }
            var opAttrs = [{ name: 'T', type: _this.binding.TF_ATTR_TYPE, value: typeAttr }];
            _this.binding.executeOp('WriteScalarSummary', opAttrs, _this.getInputTensorIds(inputArgs), 0);
        });
    };
    NodeJSKernelBackend.prototype.flushSummaryWriter = function (resourceHandle) {
        var inputArgs = [resourceHandle];
        this.executeMultipleOutputs('FlushSummaryWriter', [], inputArgs, 0);
    };
    // ~ TensorBoard-related (tfjs-node-specific) backend kernels.
    // ------------------------------------------------------------
    NodeJSKernelBackend.prototype.memory = function () {
        // Due to automatic garbage collection, the numbers are unreliable.
        // TODO(kreeger): Since there is finalization in C, count the true
        // number of undisposed tensors.
        return { unreliable: true };
    };
    NodeJSKernelBackend.prototype.time = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var start, elapsed;
            return __generator(this, function (_a) {
                start = process.hrtime();
                f();
                elapsed = process.hrtime(start);
                return [2 /*return*/, { kernelMs: elapsed[0] * 1000 + elapsed[1] / 1000000 }];
            });
        });
    };
    NodeJSKernelBackend.prototype.getNumOfSavedModels = function () {
        return this.binding.getNumOfSavedModels();
    };
    return NodeJSKernelBackend;
}(tfjs_1.KernelBackend));
exports.NodeJSKernelBackend = NodeJSKernelBackend;
/** Returns an instance of the Node.js backend. */
function nodeBackend() {
    return tf.findBackend('tensorflow');
}
exports.nodeBackend = nodeBackend;
/** Returns the TF dtype for a given DataType. */
function getTFDType(dataType) {
    var binding = nodeBackend().binding;
    switch (dataType) {
        case 'float32':
            return binding.TF_FLOAT;
        case 'int32':
            return binding.TF_INT32;
        case 'bool':
            return binding.TF_BOOL;
        case 'complex64':
            return binding.TF_COMPLEX64;
        case 'string':
            return binding.TF_STRING;
        // tslint:disable-next-line:no-any
        case 'int64':
            // int64 is not a generally supported dtype in TensorFlow.js
            // (tfjs-core). However, it needs to be included here for the purpose of
            // writing the `step` value to TensorBoard via WriteScalarSummary and
            // other op kernels.
            return binding.TF_INT64;
        default:
            var errorMessage = "Unknown dtype: " + dataType;
            throw new Error(errorMessage);
    }
}
exports.getTFDType = getTFDType;
/**
 * Creates a TFEOpAttr for a 'type' OpDef attribute.
 * @deprecated Please use createTensorsTypeOpAttr() going forward.
 */
function createTypeOpAttr(attrName, dtype) {
    return {
        name: attrName,
        type: nodeBackend().binding.TF_ATTR_TYPE,
        value: getTFDType(dtype)
    };
}
exports.createTypeOpAttr = createTypeOpAttr;
/**
 * Creates a TFEOpAttr for a 'type' OpDef attribute from a Tensor or list of
 * Tensors.
 */
function createTensorsTypeOpAttr(attrName, tensors) {
    if (util_1.isNullOrUndefined(tensors)) {
        throw new Error('Invalid input tensors value.');
    }
    return {
        name: attrName,
        type: nodeBackend().binding.TF_ATTR_TYPE,
        value: getTFDTypeForInputs(tensors)
    };
}
exports.createTensorsTypeOpAttr = createTensorsTypeOpAttr;
/** Returns the dtype number for a single or list of input Tensors. */
function getTFDTypeForInputs(tensors) {
    if (util_1.isNullOrUndefined(tensors)) {
        throw new Error('Invalid input tensors value.');
    }
    if (util_1.isArray(tensors)) {
        for (var i = 0; i < tensors.length; i++) {
            return getTFDType(tensors[i].dtype);
        }
        return -1;
    }
    else {
        return getTFDType(tensors.dtype);
    }
}
function ensureTensorflowBackend() {
    tf.util.assert(tf.getBackend() === 'tensorflow', function () { return "Expect the current backend to be \"tensorflow\", but got \"" + tf.getBackend() + "\""; });
}
exports.ensureTensorflowBackend = ensureTensorflowBackend;
