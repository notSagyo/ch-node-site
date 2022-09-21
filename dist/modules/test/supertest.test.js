"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const app_1 = require("../../app");
const request = (0, supertest_1.default)(app_1.app);
const padString = (str) => {
    return (str + ' ').padEnd(78, '=') + '||';
};
const testWithSupertest = async () => {
    let prods = [];
    let firstId = '';
    describe(padString('Test API with supertest'), async () => {
        describe(padString('GET Products'), () => {
            it('should return status < 400', async () => {
                const res = await request.get('/api/productos');
                prods = res.body;
                firstId = prods?.[0]?.id;
                console.log(prods);
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('GET Product by ID' + firstId), () => {
            it('should return status 200 or 404', async () => {
                const res = await request.get('/api/productos/' + firstId);
                console.log(res.body);
                (0, chai_1.expect)(res.status).to.be.oneOf([200, 404]);
            });
        });
        describe(padString('DELETE Product by ID' + firstId), () => {
            it('should return status < 400', async () => {
                const res = await request.delete('/api/productos/' + firstId);
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('DELETE All Products'), () => {
            it('should return status < 400', async () => {
                const res = await request.delete('/api/productos/');
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('DELETE All Products'), () => {
            it('should return status < 400', async () => {
                const res = await request.delete('/api/productos/');
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('POST Product'), () => {
            it('should return status < 400', async () => {
                const res = await request
                    .post('/api/productos/')
                    .send({ name: 'Supertest product', price: 100 });
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('PUT Product'), () => {
            it('should return status < 400', async () => {
                prods = (await request.get('/api/productos/')).body;
                firstId = prods?.[0]?.id;
                const res = await request
                    .put('/api/productos/' + firstId)
                    .send({ name: 'Supertest updated', price: 666 });
                (0, chai_1.expect)(res.status).to.lessThan(400);
            });
        });
        describe(padString('Products after all tests'), () => {
            it('should contain one updated item', async () => {
                const res = await request.get('/api/productos');
                console.log(res.body);
                (0, chai_1.expect)(res.body.length).to.equal(1);
            });
        });
    });
};
testWithSupertest();
