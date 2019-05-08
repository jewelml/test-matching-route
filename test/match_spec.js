import { expect, } from 'chai';
import { findMatchingRoutePath, getParameterizedPath, ROUTE_MAP, } from '../index';

const routes = {
  '/collections/:collection/products/:product': { page:'data1', },
  '/products/:product': { page:'data2',  },
  '/somedata/:collection/products/:id': { page:'data3', },
  '/:product': { page:'data4',  },
  '/:id': { page:'data5', },
};

describe('testMatchingScript', () => {
  describe('findMatchingRoutePath', () => {
    it('should return matching route from array of routes', () => {
      expect(findMatchingRoutePath(Object.keys(routes), '/products/asfdas')).to.equal('/products/:product');
      expect(findMatchingRoutePath(Object.keys(routes), '/products/asfdas#workwithhas')).to.equal('/products/:product');
      expect(findMatchingRoutePath(Object.keys(routes), '/products/asfdas?someQueryString=true')).to.equal('/products/:product');
      // expect(findMatchingRoutePath(Object.keys(routes), 'https://www.example.com/products/afdsf')).to.equal('/products/:product');
      
    });
    it('should return matching route from object of routes', () => {
      const notARealLink = findMatchingRoutePath(routes, '/not/a/real/link');
      
      expect(notARealLink).to.be.undefined;
      expect(findMatchingRoutePath(routes, '/collections/asfdas/products/afasf')).to.equal('/collections/:collection/products/:product');
      expect(findMatchingRoutePath(routes, '/collections/ha8vsfjsaf/products/asdfa')).to.equal('/collections/:collection/products/:product');
    });
  });
  describe('getParameterizedPath', () => {
    it('should return parameterized path', () => { 
      const proute = getParameterizedPath('/products/:product');
      expect(proute.keys).to.be.an('array');
      expect(proute.keys).to.have.lengthOf(1);
      expect(proute.re).to.be.instanceOf(RegExp);
    });
  });
  describe('ROUTE_MAP', () => {
    it('should store cached lookups in map', () => {
      expect(ROUTE_MAP.size).to.eql(Object.keys(routes).length);
    });
    it('should return matching route from object of routes without route cache', () => {
      const noCache = getParameterizedPath('/products/:product', { useMap: false, });
      // console.log({ noCache });
      expect(noCache).to.be.an('object');
    });
  });
});