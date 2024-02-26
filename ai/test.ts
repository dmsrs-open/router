import * as tf from '@tensorflow/tfjs';
import csvParser from 'csv-parser';
import fs from 'fs';
import { SensorData } from './type';

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
        console.log(filePath)
        // 读取CSV文件
        fs.createReadStream(filePath)
            .pipe(csvParser({
                headers: ['时间', 'X', '原始重量', '稳定重量', '轴重', 'su_ad', 'wpu_x', 'wpu_y', 'wpu_z', 'su_x', 'su_y', 'su_z', '原始重量_diff', '稳定重量_diff', '轴重_diff', 'su_ad_diff', 'wpu_x_diff', 'wpu_y_diff', 'wpu_z_diff', 'su_x_diff', 'su_y_diff', 'su_z_diff', '轨迹时间', '速度', '估计重量', '原始重量加速度', '稳定重量加速度', '原始重量加速度_二阶', '稳定重量加速度_二阶']
                , mapValues({ header, index, value }) {
                    //console.log(index, header, value)
                    if (index > 0)
                        return parseFloat(value);
                    else
                        return new Date(value);
                },
                skipLines: 1
            }))
            .on('data', (row: SensorData) => {
                console.log(row);
                // 清洗和转化数据
                const cleanedRow: SensorData = row;

                // 差分计算（假设这里用相邻两步的差值作为差分值）
                const diffRow: Partial<SensorData> = {};
                // for (const col of diffColumns) {
                //     if (typeof cleanedRow[col.replace('_diff', '')] === 'number') {
                //         diffRow[col] = cleanedRow[col.replace('_diff', '')] -
                //             (cleanedRow.prev && cleanedRow.prev[col.replace('_diff', '')] || 0); // 初始化时，前一步默认为0
                //     }
                // }

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
                resolve({});
            });
    });
    // 将数据转化为Tensor
    const trainFeaturesTensor = tf.tensor2d(trainFeatures);
    const trainLabelsTensor = tf.tensor2d(trainLabels);

    return { trainFeatures: trainFeaturesTensor, trainLabels: trainLabelsTensor };

}
// 构建LSTM模型
function buildModel(inputShape: [number, number]): tf.Sequential {
    const model = tf.sequential();
    model.add(tf.layers.lstm({
        units: 64,
        inputShape,
        returnSequences: false,
    }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // 假设标签为二分类（拐点/非拐点）

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy'],
    });

    return model;
}

async function main() {
    const filePath = './data_17.csv';
    const sequenceLength = 10000; // 根据实际需求设置序列长度

    const { trainFeatures, trainLabels } = await loadAndPreprocessData(filePath, sequenceLength);
    const model = buildModel([sequenceLength, trainFeatures.shape[1]]);

    // 训练模型
    await model.fit(trainFeatures, trainLabels, {
        epochs: 100,
        validationSplit: 0.2,
        batchSize: 32,
    });

    // 使用模型进行预测
    // ...
}

// main();

const filePath = 'data_17.csv';
fs.createReadStream(filePath)
    .pipe(csvParser({
        headers: ['时间', 'X', '原始重量', '稳定重量', '轴重', 'su_ad', 'wpu_x', 'wpu_y', 'wpu_z', 'su_x', 'su_y', 'su_z', '原始重量_diff', '稳定重量_diff', '轴重_diff', 'su_ad_diff', 'wpu_x_diff', 'wpu_y_diff', 'wpu_z_diff', 'su_x_diff', 'su_y_diff', 'su_z_diff', '轨迹时间', '速度', '估计重量', '原始重量加速度', '稳定重量加速度', '原始重量加速度_二阶', '稳定重量加速度_二阶']
        , mapValues({ header, index, value }) {
            if (index > 0)
                return parseFloat(value);
            else
                return value;
        },
    }))
    .on('data', (row: any) => {
        console.log(row);
    })