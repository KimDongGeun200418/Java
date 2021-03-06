"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_1 = require("@tensorflow/tfjs");
var nodejs_kernel_backend_1 = require("../nodejs_kernel_backend");
// TODO(nsthorat, dsmilkov): Remove dependency on tensors, use dataId.
tfjs_1.registerKernel({
    kernelName: 'NonMaxSuppressionV5',
    backendName: 'tensorflow',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
        var _b = inputs, boxes = _b.boxes, scores = _b.scores;
        var _c = attrs, maxOutputSize = _c.maxOutputSize, iouThreshold = _c.iouThreshold, scoreThreshold = _c.scoreThreshold, softNmsSigma = _c.softNmsSigma;
        var maxOutputSizeTensor = tfjs_1.scalar(maxOutputSize, 'int32');
        var iouThresholdTensor = tfjs_1.scalar(iouThreshold);
        var scoreThresholdTensor = tfjs_1.scalar(scoreThreshold);
        var softNmsSigmaTensor = tfjs_1.scalar(softNmsSigma);
        var opAttrs = [nodejs_kernel_backend_1.createTypeOpAttr('T', boxes.dtype)];
        var nodeBackend = backend;
        var _d = nodeBackend.executeMultipleOutputs('NonMaxSuppressionV5', opAttrs, [
            boxes, scores, maxOutputSizeTensor,
            iouThresholdTensor, scoreThresholdTensor, softNmsSigmaTensor
        ], 3), selectedIndices = _d[0], selectedScores = _d[1], validOutputs = _d[2];
        maxOutputSizeTensor.dispose();
        iouThresholdTensor.dispose();
        scoreThresholdTensor.dispose();
        softNmsSigmaTensor.dispose();
        validOutputs.dispose();
        return [selectedIndices, selectedScores];
    }
});
