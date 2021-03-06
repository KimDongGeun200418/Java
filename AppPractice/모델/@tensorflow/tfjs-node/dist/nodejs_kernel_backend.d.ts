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
import * as tf from '@tensorflow/tfjs';
import { backend_util, BackendTimingInfo, DataId, DataType, KernelBackend, Rank, Scalar, ShapeMap, Tensor, Tensor1D, Tensor2D, Tensor3D, Tensor4D, Tensor5D, TensorInfo } from '@tensorflow/tfjs';
import { FusedBatchMatMulConfig, FusedConv2DConfig } from '@tensorflow/tfjs-core/dist/ops/fused_util';
import { TFEOpAttr, TFJSBinding } from './tfjs_binding';
export declare class NodeJSKernelBackend extends KernelBackend {
    binding: TFJSBinding;
    isGPUPackage: boolean;
    isUsingGpuDevice: boolean;
    private tensorMap;
    constructor(binding: TFJSBinding, packageName: string);
    private getDTypeInteger;
    private typeAttributeFromTensor;
    private createOutputTensor;
    private getInputTensorIds;
    private createReductionOpAttrs;
    private executeSingleInput;
    floatPrecision(): 16 | 32;
    epsilon(): number;
    /**
     * Executes a TensorFlow Eager Op that provides one output Tensor.
     * @param name The name of the Op to execute.
     * @param opAttrs The list of Op attributes required to execute.
     * @param inputs The list of input Tensors for the Op.
     * @return A resulting Tensor from Op execution.
     */
    executeSingleOutput(name: string, opAttrs: TFEOpAttr[], inputs: TensorInfo[]): Tensor;
    /**
     * Executes a TensorFlow Eager Op that provides multiple output Tensors.
     * @param name The name of the Op to execute.
     * @param opAttrs The list of Op attributes required to execute.
     * @param inputs The list of input Tensors for the Op.
     * @param numOutputs The number of output Tensors for Op execution.
     * @return A resulting Tensor array from Op execution.
     */
    executeMultipleOutputs(name: string, opAttrs: TFEOpAttr[], inputs: Tensor[], numOutputs: number): Tensor[];
    numDataIds(): number;
    dispose(): void;
    read(dataId: DataId): Promise<backend_util.BackendValues>;
    readSync(dataId: DataId): backend_util.BackendValues;
    disposeData(dataId: DataId): void;
    move(dataId: DataId, values: backend_util.BackendValues, shape: number[], dtype: DataType): void;
    write(values: backend_util.BackendValues, shape: number[], dtype: DataType): DataId;
    fill<R extends Rank>(shape: ShapeMap[R], value: number | string, dtype?: DataType): Tensor<R>;
    onesLike<R extends Rank>(x: Tensor<R>): Tensor<R>;
    zerosLike<R extends Rank>(x: Tensor<R>): Tensor<R>;
    stridedSlice<T extends Tensor>(x: T, begin: number[], end: number[], strides: number[]): T;
    unstack(x: Tensor, axis: number): Tensor[];
    batchMatMul(a: Tensor<Rank.R3>, b: Tensor<Rank.R3>, transposeA: boolean, transposeB: boolean): Tensor<Rank.R3>;
    private applyActivation;
    fusedConv2d({ input, filter, convInfo, bias, activation, preluActivationWeights }: FusedConv2DConfig): Tensor4D;
    fusedBatchMatMul({ a, b, transposeA, transposeB, bias, activation, preluActivationWeights }: FusedBatchMatMulConfig): Tensor3D;
    slice<T extends Tensor>(x: T, begin: number[], size: number[]): T;
    reverse<T extends Tensor>(a: T, axis: number[]): T;
    concat(tensors: Tensor[], axis: number): Tensor;
    neg<T extends Tensor>(a: T): T;
    diag(x: Tensor): Tensor;
    add(a: Tensor, b: Tensor): Tensor;
    select(condition: Tensor, a: Tensor, b: Tensor): Tensor;
    addN<T extends Tensor>(tensors: T[]): T;
    subtract(a: Tensor, b: Tensor): Tensor;
    multiply(a: Tensor, b: Tensor): Tensor;
    realDivide(a: Tensor, b: Tensor): Tensor;
    floorDiv(a: Tensor, b: Tensor): Tensor;
    divide(a: Tensor, b: Tensor): Tensor;
    divNoNan(a: Tensor, b: Tensor): Tensor;
    unsortedSegmentSum<T extends Tensor>(x: T, segmentIds: Tensor1D, numSegments: number): Tensor;
    sum(x: Tensor, axes: number[]): Tensor;
    prod(x: Tensor, axes: number[]): Tensor;
    argMin(x: Tensor, axis: number): Tensor;
    argMax(x: Tensor, axis: number): Tensor;
    equal(a: Tensor, b: Tensor): Tensor;
    notEqual(a: Tensor, b: Tensor): Tensor;
    less(a: Tensor, b: Tensor): Tensor;
    lessEqual(a: Tensor, b: Tensor): Tensor;
    greater(a: Tensor, b: Tensor): Tensor;
    greaterEqual(a: Tensor, b: Tensor): Tensor;
    logicalNot<T extends Tensor>(a: T): T;
    logicalAnd(a: Tensor, b: Tensor): Tensor;
    logicalOr(a: Tensor, b: Tensor): Tensor;
    where(condition: Tensor): Tensor2D;
    topKValues<T extends Tensor>(x: T, k: number): Tensor1D;
    topKIndices(x: Tensor, k: number): Tensor1D;
    topk<T extends Tensor>(x: T, k?: number, sorted?: boolean): [T, T];
    min(x: Tensor, axes: number[]): Tensor;
    minimum(a: Tensor, b: Tensor): Tensor;
    max(x: Tensor, axes: number[]): Tensor;
    maximum(a: Tensor, b: Tensor): Tensor;
    all(x: Tensor, axes: number[]): Tensor;
    any(x: Tensor, axes: number[]): Tensor;
    ceil<T extends Tensor>(x: T): T;
    floor<T extends Tensor>(x: T): T;
    pow<T extends Tensor>(a: T, b: Tensor): T;
    exp<T extends Tensor>(x: T): T;
    log<T extends Tensor>(x: T): T;
    log1p<T extends Tensor>(x: T): T;
    sqrt<T extends Tensor>(x: T): T;
    square<T extends Tensor>(x: T): T;
    relu<T extends Tensor>(x: T): T;
    relu6<T extends Tensor>(x: T): T;
    prelu<T extends Tensor>(x: T, a: T): T;
    elu<T extends Tensor>(x: T): T;
    eluDer<T extends Tensor>(dy: T, y: T): T;
    selu<T extends Tensor>(x: T): T;
    int<T extends Tensor>(x: T): T;
    clip<T extends Tensor>(x: T, min: number, max: number): T;
    abs<T extends Tensor>(x: T): T;
    complexAbs<T extends Tensor>(x: T): T;
    sigmoid<T extends Tensor>(x: T): T;
    sin<T extends Tensor>(x: T): T;
    cos<T extends Tensor>(x: T): T;
    tan<T extends Tensor>(x: T): T;
    asin<T extends Tensor>(x: T): T;
    acos<T extends Tensor>(x: T): T;
    atan<T extends Tensor>(x: T): T;
    sinh<T extends Tensor>(x: T): T;
    cosh<T extends Tensor>(x: T): T;
    tanh<T extends Tensor>(x: T): T;
    mod(a: Tensor, b: Tensor): Tensor;
    round<T extends Tensor>(x: T): T;
    sign<T extends Tensor>(x: T): T;
    isNaN<T extends Tensor>(x: T): T;
    isInf<T extends Tensor>(x: T): T;
    isFinite<T extends Tensor>(x: T): T;
    rsqrt<T extends Tensor>(x: T): T;
    reciprocal<T extends Tensor>(x: T): T;
    asinh<T extends Tensor>(x: T): T;
    acosh<T extends Tensor>(x: T): T;
    atanh<T extends Tensor>(x: T): T;
    erf<T extends Tensor>(x: T): T;
    squaredDifference(a: Tensor, b: Tensor): Tensor;
    expm1<T extends Tensor>(x: T): T;
    softplus<T extends Tensor>(x: T): T;
    atan2<T extends Tensor>(a: T, b: T): T;
    step<T extends Tensor>(x: T, alpha: number): T;
    conv2d(x: Tensor4D, filter: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    conv2dDerInput(dy: Tensor4D, filter: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    conv2dDerFilter(x: Tensor4D, dy: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    depthwiseConv2DDerInput(dy: Tensor4D, filter: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    depthwiseConv2DDerFilter(x: Tensor4D, dY: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    fusedDepthwiseConv2D({ input, filter, convInfo, bias, activation, preluActivationWeights }: FusedConv2DConfig): Tensor4D;
    depthwiseConv2D(input: Tensor4D, filter: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    conv3d(x: Tensor<Rank.R5>, filter: Tensor<Rank.R5>, convInfo: backend_util.Conv3DInfo): Tensor<Rank.R5>;
    conv3dDerInput(dy: Tensor<Rank.R5>, filter: Tensor<Rank.R5>, convInfo: backend_util.Conv3DInfo): Tensor<Rank.R5>;
    conv3dDerFilter(x: Tensor<Rank.R5>, dY: Tensor<Rank.R5>, convInfo: backend_util.Conv3DInfo): Tensor<Rank.R5>;
    maxPool(x: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    maxPoolBackprop(dy: Tensor4D, x: Tensor4D, y: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    avgPool(x: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    avgPoolBackprop(dy: Tensor4D, x: Tensor4D, convInfo: backend_util.Conv2DInfo): Tensor4D;
    avgPool3d(x: Tensor5D, convInfo: backend_util.Conv3DInfo): Tensor5D;
    avgPool3dBackprop(dy: Tensor5D, x: Tensor5D, convInfo: backend_util.Conv3DInfo): Tensor5D;
    maxPool3d(x: Tensor5D, convInfo: backend_util.Conv3DInfo): Tensor5D;
    maxPool3dBackprop(dy: Tensor5D, x: Tensor5D, y: Tensor5D, convInfo: backend_util.Conv3DInfo): Tensor5D;
    reshape<T extends Tensor, R extends Rank>(x: T, shape: ShapeMap[R]): Tensor<R>;
    cast<T extends Tensor>(x: T, dtype: DataType): T;
    tile<T extends Tensor>(x: T, reps: number[]): T;
    pad<T extends Tensor>(x: T, paddings: Array<[number, number]>, constantValue: number): T;
    transpose<T extends Tensor>(x: T, perm: number[]): T;
    gather<T extends Tensor>(x: T, indices: Tensor1D, axis: number): T;
    gatherND(x: Tensor, indices: Tensor): Tensor;
    scatterND<R extends Rank>(indices: Tensor, updates: Tensor, shape: ShapeMap[R]): Tensor<R>;
    batchToSpaceND<T extends Tensor>(x: T, blockShape: number[], crops: number[][]): T;
    spaceToBatchND<T extends Tensor>(x: T, blockShape: number[], paddings: number[][]): T;
    resizeBilinear(x: Tensor4D, newHeight: number, newWidth: number, alignCorners: boolean): Tensor4D;
    resizeBilinearBackprop(dy: Tensor4D, x: Tensor4D, alignCorners: boolean): Tensor4D;
    resizeNearestNeighbor(x: Tensor4D, newHeight: number, newWidth: number, alignCorners: boolean): Tensor4D;
    resizeNearestNeighborBackprop(dy: Tensor4D, x: Tensor4D, alignCorners: boolean): Tensor4D;
    batchNormalization(x: Tensor4D, mean: Tensor1D | Tensor4D, variance: Tensor1D | Tensor4D, varianceEpsilon: number, scale?: Tensor1D | Tensor4D, offset?: Tensor1D | Tensor4D): Tensor4D;
    localResponseNormalization4D(x: Tensor4D, radius: number, bias: number, alpha: number, beta: number): Tensor4D;
    LRNGrad(dy: Tensor4D, inputImage: Tensor4D, outputImage: Tensor4D, radius: number, bias: number, alpha: number, beta: number): Tensor4D;
    multinomial(logits: Tensor2D, normalized: boolean, numSamples: number, seed: number): Tensor2D;
    oneHot(indices: Tensor1D, depth: number, onValue: number, offValue: number): Tensor2D;
    cumsum(x: Tensor, axis: number, exclusive: boolean, reverse: boolean): Tensor;
    nonMaxSuppression(boxes: Tensor2D, scores: Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number): Tensor1D;
    fft(x: Tensor<Rank.R2>): Tensor<Rank.R2>;
    ifft(x: Tensor2D): Tensor2D;
    complex<T extends Tensor>(real: T, imag: T): T;
    real<T extends Tensor>(input: T): T;
    imag<T extends Tensor>(input: T): T;
    cropAndResize(image: Tensor<Rank.R4>, boxes: Tensor<Rank.R2>, boxIndex: Tensor<Rank.R1>, cropSize: [number, number], method: 'bilinear' | 'nearest', extrapolationValue: number): Tensor<Rank.R4>;
    depthToSpace(x: Tensor<Rank.R4>, blockSize: number, dataFormat: string): Tensor<Rank.R4>;
    split<T extends Tensor>(value: T, sizeSplits: number[], axis: number): T[];
    sparseToDense<R extends Rank>(sparseIndices: Tensor, sparseValues: Tensor, outputShape: ShapeMap[R], defaultValue: Tensor<Rank.R0>): Tensor<R>;
    linspace(start: number, stop: number, num: number): Tensor1D;
    decodeJpeg(contents: Uint8Array, channels: number, ratio: number, fancyUpscaling: boolean, tryRecoverTruncated: boolean, acceptableFraction: number, dctMethod: string): Tensor3D;
    decodePng(contents: Uint8Array, channels: number): Tensor3D;
    decodeBmp(contents: Uint8Array, channels: number): Tensor3D;
    decodeGif(contents: Uint8Array): Tensor4D;
    executeEncodeImageOp(name: string, opAttrs: TFEOpAttr[], imageData: Uint8Array, imageShape: number[]): Tensor;
    encodeJpeg(imageData: Uint8Array, imageShape: number[], format: '' | 'grayscale' | 'rgb', quality: number, progressive: boolean, optimizeSize: boolean, chromaDownsampling: boolean, densityUnit: 'in' | 'cm', xDensity: number, yDensity: number, xmpMetadata: string): Tensor;
    encodePng(imageData: Uint8Array, imageShape: number[], compression: number): Tensor;
    deleteSavedModel(id: number): void;
    loadSavedModelMetaGraph(path: string, tags: string): number;
    runSavedModel(id: number, inputs: Tensor[], inputOpNames: string[], outputOpNames: string[]): Tensor[];
    summaryWriter(logdir: string): Tensor1D;
    createSummaryFileWriter(resourceHandle: Tensor, logdir: string, maxQueue?: number, flushMillis?: number, filenameSuffix?: string): void;
    writeScalarSummary(resourceHandle: Tensor, step: number, name: string, value: Scalar | number): void;
    flushSummaryWriter(resourceHandle: Tensor): void;
    memory(): {
        unreliable: boolean;
    };
    time(f: () => void): Promise<BackendTimingInfo>;
    getNumOfSavedModels(): number;
}
/** Returns an instance of the Node.js backend. */
export declare function nodeBackend(): NodeJSKernelBackend;
/** Returns the TF dtype for a given DataType. */
export declare function getTFDType(dataType: tf.DataType): number;
/**
 * Creates a TFEOpAttr for a 'type' OpDef attribute.
 * @deprecated Please use createTensorsTypeOpAttr() going forward.
 */
export declare function createTypeOpAttr(attrName: string, dtype: tf.DataType): TFEOpAttr;
/**
 * Creates a TFEOpAttr for a 'type' OpDef attribute from a Tensor or list of
 * Tensors.
 */
export declare function createTensorsTypeOpAttr(attrName: string, tensors: tf.Tensor | tf.Tensor[]): {
    name: string;
    type: number;
    value: number;
};
export declare function ensureTensorflowBackend(): void;
