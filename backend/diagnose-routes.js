const fs = require('fs');
const path = require('path');

const routes = [
  './routes/auth',
  './routes/vehicles',
  './routes/users',
  './routes/drivers',
  './routes/trips',
  './routes/maintenance',
  './routes/service',
  './routes/repair'
];

console.log('🔍 Diagnosing route files...\n');

routes.forEach(route => {
  try {
    const routeModule = require(route);
    const type = typeof routeModule;
    const isFunction = typeof routeModule === 'function';
    
    if (isFunction) {
      console.log(`✅ ${route} - OK (exports a function/router)`);
    } else {
      console.log(`❌ ${route} - PROBLEM! (exports ${type}, not a function)`);
      console.log(`   Fix: Make sure it has "module.exports = router;" at the end`);
    }
  } catch (err) {
    console.log(`⚠️  ${route} - ERROR: ${err.message}`);
  }
});

console.log('\n💡 All route files should export the router with:');
console.log('   module.exports = router;');