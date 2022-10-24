import supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../../app';

const request = supertest(app);

const padString = (str: string): string => {
  return (str + ' ').padEnd(78, '=') + '||';
};

const testWithSupertest = async () => {
  let prods: Record<string, unknown>[] = [];
  let firstId: unknown = '';
  describe(padString('Test API with supertest'), async () => {
    describe(padString('GET Products'), () => {
      it('should return status < 400', async () => {
        const res = await request.get('/api/productos');
        prods = res.body;
        firstId = prods?.[0]?.id;
        console.log(prods);
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('GET Product by ID' + firstId), () => {
      it('should return status 200 or 404', async () => {
        const res = await request.get('/api/productos/' + firstId);
        console.log(res.body);
        expect(res.status).to.be.oneOf([200, 404]);
      });
    });

    describe(padString('DELETE Product by ID' + firstId), () => {
      it('should return status < 400', async () => {
        const res = await request.delete('/api/productos/' + firstId);
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('DELETE All Products'), () => {
      it('should return status < 400', async () => {
        const res = await request.delete('/api/productos/');
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('DELETE All Products'), () => {
      it('should return status < 400', async () => {
        const res = await request.delete('/api/productos/');
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('POST Product'), () => {
      it('should return status < 400', async () => {
        const res = await request
          .post('/api/productos/')
          .send({ name: 'Supertest product', price: 100 });
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('PUT Product'), () => {
      it('should return status < 400', async () => {
        prods = (await request.get('/api/productos/')).body;
        firstId = prods?.[0]?.id;
        const res = await request
          .put('/api/productos/' + firstId)
          .send({ name: 'Supertest updated', price: 666 });
        expect(res.status).to.lessThan(400);
      });
    });

    describe(padString('Products after all tests'), () => {
      it('should contain one updated item', async () => {
        const res = await request.get('/api/productos');
        console.log(res.body);
        expect(res.body.length).to.equal(1);
      });
    });
  });
};

testWithSupertest();
