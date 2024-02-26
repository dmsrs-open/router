import fs from 'fs';
import { SensorData } from '../ai/type'

import csvParser from 'csv-parser';

const filePath = '../ai/data_17.csv';
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
       // process.abort()
    }).on('end', () => {
        console.log('end');
    })