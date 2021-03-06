"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var tfjs_1 = require("@tensorflow/tfjs");
var tf = require("./index");
var nodejs_kernel_backend_1 = require("./nodejs_kernel_backend");
var saved_model_1 = require("./saved_model");
// tslint:disable-next-line:no-require-imports
var messages = require('./proto/api_pb');
describe('SavedModel', function () {
    it('deserialize SavedModel pb file', function () { return __awaiter(_this, void 0, void 0, function () {
        var modelMessage, signatureDefMapMessage, inputsMapMessage, inputsMapKeys, inputsMapKey1, inputTensorMessage, outputsMapMessage, outputsMapKeys, outputsMapKey1, outputTensorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, saved_model_1.readSavedModelProto('./test_objects/saved_model/times_three_float')];
                case 1:
                    modelMessage = _a.sent();
                    // This SavedModel has one MetaGraph with tag serve
                    expect(modelMessage.getMetaGraphsList().length).toBe(1);
                    expect(modelMessage.getMetaGraphsList()[0]
                        .getMetaInfoDef()
                        .getTagsList()
                        .length)
                        .toBe(1);
                    expect(modelMessage.getMetaGraphsList()[0].getMetaInfoDef().getTagsList()[0])
                        .toBe('serve');
                    signatureDefMapMessage = modelMessage.getMetaGraphsList()[0].getSignatureDefMap();
                    expect(signatureDefMapMessage.has('serving_default'));
                    inputsMapMessage = signatureDefMapMessage.get('serving_default').getInputsMap();
                    expect(inputsMapMessage.getLength()).toBe(1);
                    inputsMapKeys = inputsMapMessage.keys();
                    inputsMapKey1 = inputsMapKeys.next();
                    expect(inputsMapKey1.done).toBe(false);
                    expect(inputsMapKey1.value).toBe('x');
                    inputTensorMessage = inputsMapMessage.get(inputsMapKey1.value);
                    expect(inputTensorMessage.getName()).toBe('serving_default_x:0');
                    expect(saved_model_1.getEnumKeyFromValue(messages.DataType, inputTensorMessage.getDtype()))
                        .toBe('DT_FLOAT');
                    outputsMapMessage = signatureDefMapMessage.get('serving_default').getOutputsMap();
                    expect(outputsMapMessage.getLength()).toBe(1);
                    outputsMapKeys = outputsMapMessage.keys();
                    outputsMapKey1 = outputsMapKeys.next();
                    expect(outputsMapKey1.done).toBe(false);
                    expect(outputsMapKey1.value).toBe('output_0');
                    outputTensorMessage = outputsMapMessage.get(outputsMapKey1.value);
                    expect(outputTensorMessage.getName()).toBe('StatefulPartitionedCall:0');
                    expect(saved_model_1.getEnumKeyFromValue(messages.DataType, outputTensorMessage.getDtype()))
                        .toBe('DT_FLOAT');
                    return [2 /*return*/];
            }
        });
    }); });
    it('get enum key based on value', function () {
        var DataType = messages.DataType;
        var enumKey0 = saved_model_1.getEnumKeyFromValue(DataType, 0);
        expect(enumKey0).toBe('DT_INVALID');
        var enumKey1 = saved_model_1.getEnumKeyFromValue(DataType, 1);
        expect(enumKey1).toBe('DT_FLOAT');
        var enumKey2 = saved_model_1.getEnumKeyFromValue(DataType, 2);
        expect(enumKey2).toBe('DT_DOUBLE');
    });
    it('read non-exist file', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, saved_model_1.readSavedModelProto('/not-exist')];
                case 1:
                    _a.sent();
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    expect(err_1.message)
                        .toBe("There is no saved_model.pb file in the directory: /not-exist");
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('inspect SavedModel metagraphs', function () { return __awaiter(_this, void 0, void 0, function () {
        var modelInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.node.getMetaGraphsFromSavedModel('./test_objects/saved_model/times_three_float')];
                case 1:
                    modelInfo = _a.sent();
                    /**
                     * The inspection output should be
                     * [{
                     *  'tags': ['serve'],
                     *  'signatureDefs': {
                     *      '__saved_model_init_op': {
                     *        'inputs': {},
                     *        'outputs': {
                     *          '__saved_model_init_op': {
                     *            'dtype': 'DT_INVALID',
                     *            'name': 'NoOp',
                     *            'shape': []
                     *          }
                     *        }
                     *      },
                     *      'serving_default': {
                     *        'inputs': {
                     *          'x': {
                     *            'dtype': 'DT_FLOAT',
                     *            'name': 'serving_default_x:0',
                     *            'shape':[]
                     *          }
                     *        },
                     *        'outputs': {
                     *          'output_0': {
                     *            'dtype': 'DT_FLOAT',
                     *            'name': 'StatefulPartitionedCall:0',
                     *            'shape': []
                     *          }
                     *        }
                     *      }
                     *   }
                     * }]
                     */
                    expect(modelInfo.length).toBe(1);
                    expect(modelInfo[0].tags.length).toBe(1);
                    expect(modelInfo[0].tags[0]).toBe('serve');
                    expect(Object.keys(modelInfo[0].signatureDefs).length).toBe(1);
                    expect(Object.keys(modelInfo[0].signatureDefs)[0]).toBe('serving_default');
                    expect(Object.keys(modelInfo[0].signatureDefs['serving_default'].inputs)
                        .length)
                        .toBe(1);
                    expect(modelInfo[0].signatureDefs['serving_default'].inputs['x'].name)
                        .toBe('serving_default_x:0');
                    expect(modelInfo[0].signatureDefs['serving_default'].inputs['x'].dtype)
                        .toBe('float32');
                    expect(Object.keys(modelInfo[0].signatureDefs['serving_default'].outputs)
                        .length)
                        .toBe(1);
                    expect(modelInfo[0].signatureDefs['serving_default'].outputs['output_0'].name)
                        .toBe('StatefulPartitionedCall:0');
                    expect(modelInfo[0].signatureDefs['serving_default'].outputs['output_0'].dtype)
                        .toBe('float32');
                    return [2 /*return*/];
            }
        });
    }); });
    it('get input and output node names from SavedModel metagraphs', function () { return __awaiter(_this, void 0, void 0, function () {
        var modelInfo, inputAndOutputNodeNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.node.getMetaGraphsFromSavedModel('./test_objects/saved_model/times_three_float')];
                case 1:
                    modelInfo = _a.sent();
                    inputAndOutputNodeNames = saved_model_1.getInputAndOutputNodeNameFromMetaGraphInfo(modelInfo, ['serve'], 'serving_default');
                    expect(inputAndOutputNodeNames.length).toBe(2);
                    expect(inputAndOutputNodeNames[0]['x']).toBe('serving_default_x:0');
                    expect(inputAndOutputNodeNames[1]['output_0'])
                        .toBe('StatefulPartitionedCall:0');
                    return [2 /*return*/];
            }
        });
    }); });
    it('load TFSavedModel', function () { return __awaiter(_this, void 0, void 0, function () {
        var loadSavedModelMetaGraphSpy, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loadSavedModelMetaGraphSpy = spyOn(nodejs_kernel_backend_1.nodeBackend(), 'loadSavedModelMetaGraph').and.callThrough();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _a.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('load TFSavedModel with wrong tags throw exception', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve', 'gpu'], 'serving_default')];
                case 1:
                    _a.sent();
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1.message)
                        .toBe('The SavedModel does not have tags: serve,gpu');
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('load TFSavedModel with wrong signature throw exception', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'wrong_signature')];
                case 1:
                    _a.sent();
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    expect(error_2.message)
                        .toBe('The SavedModel does not have signature: wrong_signature');
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('load TFSavedModel and delete', function () { return __awaiter(_this, void 0, void 0, function () {
        var loadSavedModelMetaGraphSpy, deleteSavedModelSpy, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    loadSavedModelMetaGraphSpy = spyOn(nodejs_kernel_backend_1.nodeBackend(), 'loadSavedModelMetaGraph').and.callThrough();
                    deleteSavedModelSpy = spyOn(nodejs_kernel_backend_1.nodeBackend(), 'deleteSavedModel').and.callThrough();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(0);
                    expect(deleteSavedModelSpy).toHaveBeenCalledTimes(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _a.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    expect(deleteSavedModelSpy).toHaveBeenCalledTimes(0);
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    model.dispose();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    expect(deleteSavedModelSpy).toHaveBeenCalledTimes(1);
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete TFSavedModel multiple times throw exception', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _a.sent();
                    model.dispose();
                    try {
                        model.dispose();
                        done.fail();
                    }
                    catch (error) {
                        expect(error.message).toBe('This SavedModel has already been deleted.');
                        done();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('load multiple signatures from the same metagraph only call binding once', function () { return __awaiter(_this, void 0, void 0, function () {
        var backend, loadSavedModelMetaGraphSpy, model1, model2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    backend = nodejs_kernel_backend_1.nodeBackend();
                    loadSavedModelMetaGraphSpy = spyOn(backend, 'loadSavedModelMetaGraph').and.callThrough();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'serving_default')];
                case 1:
                    model1 = _a.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'timestwo')];
                case 2:
                    model2 = _a.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    model1.dispose();
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    model2.dispose();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('load signature after delete call binding', function () { return __awaiter(_this, void 0, void 0, function () {
        var backend, spyOnCallBindingLoad, spyOnNodeBackendDelete, model1, model2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    backend = nodejs_kernel_backend_1.nodeBackend();
                    spyOnCallBindingLoad = spyOn(backend, 'loadSavedModelMetaGraph').and.callThrough();
                    spyOnNodeBackendDelete = spyOn(backend, 'deleteSavedModel').and.callThrough();
                    expect(spyOnCallBindingLoad).toHaveBeenCalledTimes(0);
                    expect(spyOnNodeBackendDelete).toHaveBeenCalledTimes(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'serving_default')];
                case 1:
                    model1 = _a.sent();
                    expect(spyOnCallBindingLoad).toHaveBeenCalledTimes(1);
                    expect(spyOnNodeBackendDelete).toHaveBeenCalledTimes(0);
                    model1.dispose();
                    expect(spyOnNodeBackendDelete).toHaveBeenCalledTimes(1);
                    expect(spyOnCallBindingLoad).toHaveBeenCalledTimes(1);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'timestwo')];
                case 2:
                    model2 = _a.sent();
                    expect(spyOnCallBindingLoad).toHaveBeenCalledTimes(2);
                    expect(spyOnNodeBackendDelete).toHaveBeenCalledTimes(1);
                    model2.dispose();
                    expect(spyOnCallBindingLoad).toHaveBeenCalledTimes(2);
                    expect(spyOnNodeBackendDelete).toHaveBeenCalledTimes(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throw error when input tensors do not match input ops', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var model, input1, input2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _a.sent();
                    input1 = tf.tensor1d([1.0, 2, 3]);
                    input2 = tf.tensor1d([1.0, 2, 3]);
                    try {
                        model.predict([input1, input2]);
                        done.fail();
                    }
                    catch (error) {
                        expect(error.message)
                            .toBe('Length of input op names (1) does not match the ' +
                            'length of input tensors (2).');
                        model.dispose();
                        done();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model float times three', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input, output, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _d.sent();
                    input = tf.tensor1d([1.0, 2, 3]);
                    output = model.predict(input);
                    expect(output.shape).toEqual(input.shape);
                    expect(output.dtype).toBe(input.dtype);
                    expect(output.dtype).toBe('float32');
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 2:
                    _c = [_d.sent()];
                    return [4 /*yield*/, input.mul(3).data()];
                case 3:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model with tensor array as input', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input, outputArray, output, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _c.sent();
                    input = tf.tensor1d([1.0, 2, 3]);
                    outputArray = model.predict([input]);
                    expect(outputArray.length).toBe(1);
                    output = outputArray[0];
                    expect(output.shape).toEqual(input.shape);
                    expect(output.dtype).toBe(input.dtype);
                    expect(output.dtype).toBe('float32');
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [3.0, 6.0, 9.0]]);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model with tensor map as input', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input, outputMap, output, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _c.sent();
                    input = tf.tensor1d([1.0, 2, 3]);
                    outputMap = model.predict({ 'x': input });
                    output = outputMap['output_0'];
                    expect(output.shape).toEqual(input.shape);
                    expect(output.dtype).toBe(input.dtype);
                    expect(output.dtype).toBe('float32');
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [3.0, 6.0, 9.0]]);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model with wrong tensor name', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var model, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_three_float', ['serve'], 'serving_default')];
                case 1:
                    model = _a.sent();
                    input = tf.tensor1d([1.0, 2, 3]);
                    try {
                        model.predict({ 'xyz': input });
                        done.fail();
                    }
                    catch (error) {
                        expect(error.message)
                            .toBe('The model signatureDef input names are x, however ' +
                            'the provided input names are xyz.');
                        model.dispose();
                        done();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model int times two', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input, output, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/times_two_int', ['serve'], 'serving_default')];
                case 1:
                    model = _c.sent();
                    input = tf.tensor1d([1, 2, 3], 'int32');
                    output = model.predict(input);
                    expect(output.shape).toEqual(input.shape);
                    expect(output.dtype).toBe(input.dtype);
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [2, 4, 6]]);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute multiple signatures from the same model', function () { return __awaiter(_this, void 0, void 0, function () {
        var backend, loadSavedModelMetaGraphSpy, model1, input1, output1, _a, _b, model2, input2, output2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    backend = nodejs_kernel_backend_1.nodeBackend();
                    loadSavedModelMetaGraphSpy = spyOn(backend, 'loadSavedModelMetaGraph').and.callThrough();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'serving_default')];
                case 1:
                    model1 = _e.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    input1 = tf.tensor1d([1, 2, 3]);
                    output1 = model1.predict(input1);
                    expect(output1.shape).toEqual(input1.shape);
                    expect(output1.dtype).toBe(input1.dtype);
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output1.data()];
                case 2:
                    _b.apply(_a, [_e.sent(), [3.0, 6.0, 9.0]]);
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'timestwo')];
                case 3:
                    model2 = _e.sent();
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    input2 = tf.tensor1d([1, 2, 3]);
                    output2 = model2.predict(input2);
                    expect(output2.shape).toEqual(input2.shape);
                    expect(output2.dtype).toBe(input2.dtype);
                    _d = (_c = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output2.data()];
                case 4:
                    _d.apply(_c, [_e.sent(), [2.0, 4.0, 6.0]]);
                    expect(loadSavedModelMetaGraphSpy).toHaveBeenCalledTimes(1);
                    model1.dispose();
                    model2.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model with single input and multiple outputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input, output, output1, output2, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/model_single_input_multi_output', ['serve'], 'serving_default')];
                case 1:
                    model = _e.sent();
                    input = tf.tensor1d([1, 2, 3], 'int32');
                    output = model.predict(input);
                    output1 = output[0];
                    output2 = output[1];
                    expect(output1.shape).toEqual(input.shape);
                    expect(output1.dtype).toBe(input.dtype);
                    expect(output2.shape).toEqual(input.shape);
                    expect(output2.dtype).toBe(input.dtype);
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output1.data()];
                case 2:
                    _b.apply(_a, [_e.sent(), [2, 4, 6]]);
                    _d = (_c = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output2.data()];
                case 3:
                    _d.apply(_c, [_e.sent(), [1, 2, 3]]);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('execute model with multiple inputs and multiple outputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var model, input1, input2, output, output1, output2, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/model_multi_output', ['serve'], 'serving_default')];
                case 1:
                    model = _e.sent();
                    input1 = tf.tensor1d([1, 2, 3], 'int32');
                    input2 = tf.tensor1d([1, 2, 3], 'int32');
                    output = model.predict({ 'x': input1, 'y': input2 });
                    output1 = output['output_0'];
                    output2 = output['output_1'];
                    expect(output1.shape).toEqual(input1.shape);
                    expect(output1.dtype).toBe(input1.dtype);
                    expect(output2.shape).toEqual(input2.shape);
                    expect(output2.dtype).toBe(input2.dtype);
                    _b = (_a = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output1.data()];
                case 2:
                    _b.apply(_a, [_e.sent(), [2, 4, 6]]);
                    _d = (_c = tfjs_1.test_util).expectArraysClose;
                    return [4 /*yield*/, output2.data()];
                case 3:
                    _d.apply(_c, [_e.sent(), [1, 2, 3]]);
                    model.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('load multiple models', function () { return __awaiter(_this, void 0, void 0, function () {
        var model1, model2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/module_with_multiple_signatures', ['serve'], 'serving_default')];
                case 1:
                    model1 = _a.sent();
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    return [4 /*yield*/, tf.node.loadSavedModel('./test_objects/saved_model/model_multi_output', ['serve'], 'serving_default')];
                case 2:
                    model2 = _a.sent();
                    expect(tf.node.getNumOfSavedModels()).toBe(2);
                    model1.dispose();
                    expect(tf.node.getNumOfSavedModels()).toBe(1);
                    model2.dispose();
                    expect(tf.node.getNumOfSavedModels()).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
