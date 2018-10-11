import { HungryBear } from '../src/js/business-logic.js';

describe('HungryBear', function() {
  let fuzzy = new HungryBear("fuzzy");

  beforeEach(function() {
    jasmine.clock().install();
    fuzzy.setTired();
    fuzzy.setHunger();
    fuzzy.foodLevel = 10;
    fuzzy.tiredLevel = 15;
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });


  it('should have a food level of 7 after 3001 milliseconds', function() {
    jasmine.clock().tick(3001);
    expect(fuzzy.foodLevel).toEqual(7);
  });

  it('should get very hungry if the food level drops below zero', function() {
    fuzzy.foodLevel = 0;
    expect(fuzzy.didYouGetEaten()).toEqual(true);
  });

  it('should have a food level of ten if it is fed', function() {
    jasmine.clock().tick(9001);
    fuzzy.feed(9);
    expect(fuzzy.foodLevel).toEqual(10);

  });

  it('should get very hungry if 10 seconds pass without feeding', function() {
    jasmine.clock().tick(10001);
    expect(fuzzy.didYouGetEaten()).toEqual(true);
  });

  it('should stop foodLevel at 0', function() {
    jasmine.clock().tick(12000);
    expect(fuzzy.foodLevel).toEqual(0);
  });

  it('should stop tiredLevel at 0', function() {
    jasmine.clock().tick(17000);
    expect(fuzzy.tiredLevel).toEqual(0);
    console.log(fuzzy.foodLevel + ' , ' + fuzzy.tiredLevel);
  });

  it('should stop hunger dropping while tired level is zero', function() {
    fuzzy.tiredLevel = 5;
    jasmine.clock().tick(8000);
    console.log(fuzzy.foodLevel + ' , ' + fuzzy.tiredLevel);
    expect(fuzzy.foodLevel).toEqual(5);
  });

  it('should restart hunger counter', function() {
    fuzzy.tiredLevel = 5;
    jasmine.clock().tick(12000);
    console.log(fuzzy.foodLevel + ' , ' + fuzzy.tiredLevel);
    expect(fuzzy.foodLevel).toEqual(3);
  });

});
