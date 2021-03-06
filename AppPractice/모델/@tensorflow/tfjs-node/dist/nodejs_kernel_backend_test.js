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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var nodejs_kernel_backend_1 = require("./nodejs_kernel_backend");
describe('delayed upload', function () {
    it('should handle data before op execution', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, _a, _b, r, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3]);
                    _b = (_a = tf.test_util).expectArraysClose;
                    return [4 /*yield*/, t.data()];
                case 1:
                    _b.apply(_a, [_e.sent(), [1, 2, 3]]);
                    r = t.add(tf.tensor1d([4, 5, 6]));
                    _d = (_c = tf.test_util).expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 2:
                    _d.apply(_c, [_e.sent(), [5, 7, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not cache tensors in the tensor map for device support. ', function () {
        var logits = tf.tensor1d([1, 2, 3]);
        var softmaxLogits = tf.softmax(logits);
        var data = softmaxLogits.dataSync();
        expect(softmaxLogits.dataSync()[0]).toEqual(data[0]);
        expect(softmaxLogits.dataSync()[1]).toEqual(data[1]);
        expect(softmaxLogits.dataSync()[2]).toEqual(data[2]);
    });
});
describe('type casting', function () {
    it('exp support int32', function () {
        tf.exp(tf.scalar(2, 'int32'));
    });
});
describe('conv3d dilations', function () {
    it('CPU should throw error on dilations >1', function () {
        var input = tf.ones([1, 2, 2, 2, 1]);
        var filter = tf.ones([1, 1, 1, 1, 1]);
        expect(function () {
            tf.conv3d(input, filter, 1, 'same', 'NDHWC', [2, 2, 2]);
        }).toThrowError();
    });
    it('GPU should handle dilations >1', function () {
        // This test can only run locally with CUDA bindings and GPU package
        // installed.
        if (tf.backend().isUsingGpuDevice) {
            var input = tf.ones([1, 2, 2, 2, 1]);
            var filter = tf.ones([1, 1, 1, 1, 1]);
            tf.conv3d(input, filter, 1, 'same', 'NDHWC', [2, 2, 2]);
        }
    });
});
describe('Exposes Backend for internal Op execution.', function () {
    it('Provides the Node backend over a function', function () {
        var backend = nodejs_kernel_backend_1.nodeBackend();
        expect(backend instanceof nodejs_kernel_backend_1.NodeJSKernelBackend).toBeTruthy();
    });
    it('Provides internal access to the binding', function () {
        expect(nodejs_kernel_backend_1.nodeBackend().binding).toBeDefined();
    });
    it('throw error if backend is not tensorflow', function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                tf.setBackend('cpu');
                nodejs_kernel_backend_1.ensureTensorflowBackend();
                done.fail();
            }
            catch (err) {
                expect(err.message)
                    .toBe('Expect the current backend to be "tensorflow", but got "cpu"');
                tf.setBackend('tensorflow');
                done();
            }
            return [2 /*return*/];
        });
    }); });
});
describe('getTFDType()', function () {
    var binding = nodejs_kernel_backend_1.nodeBackend().binding;
    it('handles float32', function () {
        expect(nodejs_kernel_backend_1.getTFDType('float32')).toBe(binding.TF_FLOAT);
    });
    it('handles int32', function () {
        expect(nodejs_kernel_backend_1.getTFDType('int32')).toBe(binding.TF_INT32);
    });
    it('handles bool', function () {
        expect(nodejs_kernel_backend_1.getTFDType('bool')).toBe(binding.TF_BOOL);
    });
    it('handles unknown types', function () {
        expect(function () { return nodejs_kernel_backend_1.getTFDType(null); }).toThrowError();
    });
});
describe('createTypeOpAttr()', function () {
    var binding = nodejs_kernel_backend_1.nodeBackend().binding;
    it('Creates a valid type attribute', function () {
        var attr = nodejs_kernel_backend_1.createTypeOpAttr('foo', 'float32');
        expect(attr.name).toBe('foo');
        expect(attr.type).toBe(binding.TF_ATTR_TYPE);
        expect(attr.value).toBe(binding.TF_FLOAT);
    });
    it('handles unknown dtypes', function () {
        expect(function () { return nodejs_kernel_backend_1.createTypeOpAttr('foo', null); }).toThrowError();
    });
});
describe('Returns TFEOpAttr for a Tensor or list of Tensors', function () {
    var binding = nodejs_kernel_backend_1.nodeBackend().binding;
    it('handles a single Tensor', function () {
        var result = nodejs_kernel_backend_1.createTensorsTypeOpAttr('T', tf.scalar(13, 'float32'));
        expect(result.name).toBe('T');
        expect(result.type).toBe(binding.TF_ATTR_TYPE);
        expect(result.value).toBe(binding.TF_FLOAT);
    });
    it('handles a list of Tensors', function () {
        var tensors = [tf.scalar(1, 'int32'), tf.scalar(20.1, 'float32')];
        var result = nodejs_kernel_backend_1.createTensorsTypeOpAttr('T', tensors);
        expect(result.name).toBe('T');
        expect(result.type).toBe(binding.TF_ATTR_TYPE);
        expect(result.value).toBe(binding.TF_INT32);
    });
    it('handles null', function () {
        expect(function () { return nodejs_kernel_backend_1.createTensorsTypeOpAttr('T', null); }).toThrowError();
    });
    it('handles list of null', function () {
        var inputs = [null, null];
        expect(function () { return nodejs_kernel_backend_1.createTensorsTypeOpAttr('T', inputs); }).toThrowError();
    });
});
