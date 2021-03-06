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
var tfn = require("../index");
// We still need node-fetch so that we can mock the core
// tf.env().platform.fetch call and return a valid response.
// tslint:disable-next-line:no-require-imports
var fetch = require('node-fetch');
var OCTET_STREAM_TYPE = 'application/octet-stream';
var JSON_TYPE = 'application/json';
// Test data;
var modelTopology1 = {
    'class_name': 'Sequential',
    'keras_version': '2.1.4',
    'config': [{
            'class_name': 'Dense',
            'config': {
                'kernel_initializer': {
                    'class_name': 'VarianceScaling',
                    'config': {
                        'distribution': 'uniform',
                        'scale': 1.0,
                        'seed': null,
                        'mode': 'fan_avg'
                    }
                },
                'name': 'dense',
                'kernel_constraint': null,
                'bias_regularizer': null,
                'bias_constraint': null,
                'dtype': 'float32',
                'activation': 'linear',
                'trainable': true,
                'kernel_regularizer': null,
                'bias_initializer': { 'class_name': 'Zeros', 'config': {} },
                'units': 1,
                'batch_input_shape': [null, 3],
                'use_bias': true,
                'activity_regularizer': null
            }
        }],
    'backend': 'tensorflow'
};
describe('nodeHTTPRequest-load', function () {
    var requestInits;
    var setupFakeWeightFiles = function (fileBufferMap) {
        spyOn(tf.env().platform, 'fetch')
            .and.callFake(function (path, init) {
            return new Promise(function (resolve, reject) {
                var contentType = '';
                if (path.endsWith('model.json')) {
                    contentType = JSON_TYPE;
                }
                else if (path.endsWith('weightfile0') || path.endsWith('weightfile1')) {
                    contentType = OCTET_STREAM_TYPE;
                }
                else {
                    reject(new Error("Invalid path: " + path));
                }
                requestInits.push(init);
                resolve(new fetch.Response(fileBufferMap[path], { 'headers': { 'Content-Type': contentType } }));
            });
        });
    };
    beforeEach(function () {
        requestInits = [];
    });
    it('Constructor', function () {
        var handler = tfn.io.nodeHTTPRequest('./foo_model.json');
        expect(handler == null).toEqual(false);
        expect(typeof handler.load).toEqual('function');
        expect(typeof handler.save).toEqual('function');
    });
    it('Load through NodeHTTPRequest object', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightManifest1, floatData, handler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightManifest1 = [{
                            paths: ['weightfile0'],
                            weights: [
                                {
                                    name: 'dense/kernel',
                                    shape: [3, 1],
                                    dtype: 'float32',
                                },
                                {
                                    name: 'dense/bias',
                                    shape: [1],
                                    dtype: 'float32',
                                }
                            ]
                        }];
                    floatData = new Float32Array([1, 3, 3, 7]);
                    setupFakeWeightFiles({
                        'http://localhost/model.json': JSON.stringify({ modelTopology: modelTopology1, weightsManifest: weightManifest1 }),
                        'http://localhost/weightfile0': floatData,
                    });
                    handler = tfn.io.nodeHTTPRequest('http://localhost/model.json', { credentials: 'include', cache: 'no-cache' });
                    return [4 /*yield*/, handler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs).toEqual(weightManifest1[0].weights);
                    expect(new Float32Array(modelArtifacts.weightData)).toEqual(floatData);
                    expect(requestInits).toEqual([
                        { credentials: 'include', cache: 'no-cache' },
                        { credentials: 'include', cache: 'no-cache' }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Load through registered handler', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightManifest1, floatData, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightManifest1 = [{
                            paths: ['weightfile0'],
                            weights: [
                                {
                                    name: 'dense/kernel',
                                    shape: [3, 1],
                                    dtype: 'float32',
                                },
                                {
                                    name: 'dense/bias',
                                    shape: [1],
                                    dtype: 'float32',
                                }
                            ]
                        }];
                    floatData = new Float32Array([1, 3, 3, 7]);
                    setupFakeWeightFiles({
                        'https://localhost/model.json': JSON.stringify({ modelTopology: modelTopology1, weightsManifest: weightManifest1 }),
                        'https://localhost/weightfile0': floatData,
                    });
                    return [4 /*yield*/, tf.loadLayersModel('https://localhost/model.json')];
                case 1:
                    model = _a.sent();
                    expect(model.inputs.length).toEqual(1);
                    expect(model.inputs[0].shape).toEqual([null, 3]);
                    expect(model.outputs.length).toEqual(1);
                    expect(model.outputs[0].shape).toEqual([null, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
