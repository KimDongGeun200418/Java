"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
exports.squaredDifferenceConfig = {
    // TODO import this kernelName from core once exported.
    kernelName: 'SquaredDifference',
    backendName: 'tensorflow',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var a = inputs.a, b = inputs.b;
        var opAttrs = [nodejs_kernel_backend_1.createTypeOpAttr('T', a.dtype)];
        var nodeBackend = backend;
        return nodeBackend.executeSingleOutput('SquaredDifference', opAttrs, [a, b]);
    }
};
tfjs_1.registerKernel(exports.squaredDifferenceConfig);
