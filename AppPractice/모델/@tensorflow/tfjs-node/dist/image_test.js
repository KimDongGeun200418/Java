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
var fs = require("fs");
var util_1 = require("util");
var image_1 = require("./image");
var tf = require("./index");
var readFile = util_1.promisify(fs.readFile);
describe('decode images', function () {
    it('decode png', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_test.png')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodePng(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode png 1 channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_test.png')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array, 1);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 1]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [130, 50, 59, 124]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode png 3 channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_test.png')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode png 4 channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_4_channel_test.png')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array, 4);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 4]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [
                            238, 101, 0, 255, 50, 50, 50, 255, 100, 50, 0, 255, 200, 100, 50, 255
                        ]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode bmp', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_bmp_test.bmp')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeBmp(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode bmp through decodeImage', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_bmp_test.bmp')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode jpg', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_jpeg_test.jpeg')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeJpeg(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode jpg 1 channel', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_jpeg_test.jpeg')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array, 1);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 1]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [130, 47, 56, 121]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode jpg 3 channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_jpeg_test.jpeg')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array, 3);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode jpg with 0 channels, use the number of channels in the ' +
        'JPEG-encoded image', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_jpeg_test.jpeg')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode jpg with downscale', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_jpeg_test.jpeg')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeJpeg(uint8array, 0, 2);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([1, 1, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [147, 75, 25]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode gif', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/gif_test.gif')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(), [
                            238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50,
                            200, 100, 50, 34, 68, 102, 170, 0, 102, 255, 255, 255
                        ]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('decode gif with no expandAnimation', function () { return __awaiter(_this, void 0, void 0, function () {
        var beforeNumTensors, uint8array, imageTensor, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/gif_test.gif')];
                case 1:
                    uint8array = _c.sent();
                    imageTensor = tf.node.decodeImage(uint8array, 3, 'int32', false);
                    expect(imageTensor.dtype).toBe('int32');
                    expect(imageTensor.shape).toEqual([2, 2, 3]);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 2:
                    _b.apply(_a, [_c.sent(),
                        [238, 101, 0, 50, 50, 50, 100, 50, 0, 200, 100, 50]]);
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors + 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throw error if request non int32 dtype', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var uint8array, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_test.png')];
                case 1:
                    uint8array = _a.sent();
                    tf.node.decodeImage(uint8array, 0, 'uint8');
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1.message)
                        .toBe('decodeImage could only return Tensor of type `int32` for now.');
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('throw error if decode invalid image type', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var uint8array, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUint8ArrayFromImage('package.json')];
                case 1:
                    uint8array = _a.sent();
                    tf.node.decodeImage(uint8array);
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    expect(error_2.message)
                        .toBe('Expected image (BMP, JPEG, PNG, or GIF), ' +
                        'but got unsupported image type');
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('throw error if backend is not tensorflow', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var uint8array, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tfjs_1.setBackend('cpu');
                    return [4 /*yield*/, getUint8ArrayFromImage('test_objects/images/image_png_test.png')];
                case 1:
                    uint8array = _a.sent();
                    tf.node.decodeImage(uint8array);
                    done.fail();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    expect(err_1.message)
                        .toBe('Expect the current backend to be "tensorflow", but got "cpu"');
                    tfjs_1.setBackend('tensorflow');
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
describe('encode images', function () {
    it('encodeJpeg', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, beforeNumTensors, jpegEncodedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]), [2, 2, 3]);
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodeJpeg(imageTensor)];
                case 1:
                    jpegEncodedData = _a.sent();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(jpegEncodedData)).toEqual(image_1.ImageType.JPEG);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('encodeJpeg grayscale', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, beforeNumTensors, jpegEncodedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 0, 47, 0]), [2, 2, 1]);
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodeJpeg(imageTensor, 'grayscale')];
                case 1:
                    jpegEncodedData = _a.sent();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(jpegEncodedData)).toEqual(image_1.ImageType.JPEG);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('encodeJpeg with parameters', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, format, quality, progressive, optimizeSize, chromaDownsampling, densityUnit, xDensity, yDensity, beforeNumTensors, jpegEncodedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]), [2, 2, 3]);
                    format = 'rgb';
                    quality = 50;
                    progressive = true;
                    optimizeSize = true;
                    chromaDownsampling = false;
                    densityUnit = 'cm';
                    xDensity = 500;
                    yDensity = 500;
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodeJpeg(imageTensor, format, quality, progressive, optimizeSize, chromaDownsampling, densityUnit, xDensity, yDensity)];
                case 1:
                    jpegEncodedData = _a.sent();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(jpegEncodedData)).toEqual(image_1.ImageType.JPEG);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('encodePng', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, beforeNumTensors, pngEncodedData, pngDecodedTensor, pngDecodedData, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]), [2, 2, 3]);
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodePng(imageTensor)];
                case 1:
                    pngEncodedData = _c.sent();
                    return [4 /*yield*/, tf.node.decodePng(pngEncodedData)];
                case 2:
                    pngDecodedTensor = _c.sent();
                    return [4 /*yield*/, pngDecodedTensor.data()];
                case 3:
                    pngDecodedData = _c.sent();
                    pngDecodedTensor.dispose();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(pngEncodedData)).toEqual(image_1.ImageType.PNG);
                    _b = (_a = tfjs_1.test_util).expectArraysEqual;
                    return [4 /*yield*/, imageTensor.data()];
                case 4:
                    _b.apply(_a, [_c.sent(), pngDecodedData]);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('encodePng grayscale', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, beforeNumTensors, pngEncodedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 0, 47, 0]), [2, 2, 1]);
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodePng(imageTensor)];
                case 1:
                    pngEncodedData = _a.sent();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(pngEncodedData)).toEqual(image_1.ImageType.PNG);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('encodePng with parameters', function () { return __awaiter(_this, void 0, void 0, function () {
        var imageTensor, compression, beforeNumTensors, pngEncodedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageTensor = tf.tensor3d(new Uint8Array([239, 100, 0, 46, 48, 47, 92, 49, 0, 194, 98, 47]), [2, 2, 3]);
                    compression = 4;
                    beforeNumTensors = tfjs_1.memory().numTensors;
                    return [4 /*yield*/, tf.node.encodePng(imageTensor, compression)];
                case 1:
                    pngEncodedData = _a.sent();
                    expect(tfjs_1.memory().numTensors).toBe(beforeNumTensors);
                    expect(image_1.getImageType(pngEncodedData)).toEqual(image_1.ImageType.PNG);
                    imageTensor.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
});
function getUint8ArrayFromImage(path) {
    return __awaiter(this, void 0, void 0, function () {
        var image, buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile(path)];
                case 1:
                    image = _a.sent();
                    buf = Buffer.from(image);
                    return [2 /*return*/, new Uint8Array(buf)];
            }
        });
    });
}
