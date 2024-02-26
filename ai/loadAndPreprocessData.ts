import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';
type SensorData = {
    time: string;
    originalWeight: number;
    stableWeight: number;
    // 省略其它字段...
    estimatedWeight: number;
    originalAccel2ndOrder: number;
    stableAccel2ndOrder: number;
};

type ProcessedData = {
    featureValues: number[];
    labelValue: number; // 假设这里是一个二进制标签，0代表非拐点，1代表拐点
};

async function loadAndPreprocessData(filePath: string, sequenceLength: number): Promise<{ trainFeatures: tf.Tensor2D, trainLabels: tf.Tensor2D }> {
    const featureColumns = [
        'originalWeight', 'stableWeight', 'axleWeight', // 省略其它特征字段
        'speed', 'estimatedWeight', 'originalAccel', 'stableAccel', 'originalAccel2ndOrder', 'stableAccel2ndOrder'
    ];

    const diffColumns = featureColumns.map(col => `${col}_diff`);

    const data: SensorData[] = [];
    const trainFeatures: number[][] = [];
    const trainLabels: number[][] = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row: any) => {
                // 清洗和转化数据
                const cleanedRow: SensorData = {
                    time: row.time,
                    originalWeight: parseFloat(row.originalWeight),
                    stableWeight: parseFloat(row.stableWeight),
                    // 省略其它字段转化
                    speed: parseFloat(row.speed),
                    estimatedWeight: parseFloat(row.estimatedWeight),
                    originalAccel: parseFloat(row.originalAccel),
                    stableAccel: parseFloat(row.stableAccel),
                    originalAccel2ndOrder: parseFloat(row.originalAccel2ndOrder),
                    stableAccel2ndOrder: parseFloat(row.stableAccel2ndOrder),
                };

                // 差分计算（假设这里用相邻两步的差值作为差分值）
                const diffRow: Partial<SensorData> = {};
                for (const col of diffColumns) {
                    if (typeof cleanedRow[col.replace('_diff', '')] === 'number') {
                        diffRow[col] = cleanedRow[col.replace('_diff', '')] -
                            (cleanedRow.prev && cleanedRow.prev[col.replace('_diff', '')] || 0); // 初始化时，前一步默认为0
                    }
                }

                // 合并原始值和差分值
                const processedRow: ProcessedData = {
                    featureValues: [...Object.values(cleanedRow), ...Object.values(diffRow)].filter(val => typeof val === 'number'),
                    // 假设我们根据某个特定规则（如速度、加速度的变化）来定义拐点，这里仅做示意
                    labelValue: 1/* 根据你的业务逻辑计算labelValue，例如判断速度或加速度是否有明显变化 */
        };

                // 将数据转化为时间序列窗口
                if (trainFeatures.length >= sequenceLength) {
                    trainFeatures.shift();
                    trainLabels.shift();
                }
                trainFeatures.push(processedRow.featureValues);
                trainLabels.push([processedRow.labelValue]); // LSTM模型的标签应为一维数组

                // 存储原始数据供后续处理
                data.push(cleanedRow);
            })
            .on('error', reject)
            .on('end', () => {
                resolve();
            });
    });

    // 将数据转化为Tensor
    const trainFeaturesTensor = tf.tensor2d(trainFeatures);
    const trainLabelsTensor = tf.tensor2d(trainLabels);

    return { trainFeatures: trainFeaturesTensor, trainLabels: trainLabelsTensor };
}