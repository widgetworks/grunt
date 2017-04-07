module.exports = function(grunt) {

  var obj = {};
  grunt.registerTask('finalize', 'Print all option values.', function() {
    console.log('###' + JSON.stringify(obj) + '###');
  });
  
  // Collect all unknown parameters that don't exist on 'grunt.cli.optlist'
  // so they can be output by the "finalize" task.
  grunt.registerTask('unknown', 'Collect all "unknown" options.', function() {
    Object.keys(grunt.cli.options).forEach(function(name){
      if (!grunt.cli.optlist[name]){
        obj[name] = grunt.option(name);
      }
    })
  });

  // Create a per-CLI-option task that stores the value of that option
  // to be output via the "finalize" task.
  Object.keys(grunt.cli.optlist).forEach(function(name) {
    grunt.registerTask(name, 'Store the current "' + name + '" option value.', function() {
      obj[this.name] = grunt.option(this.name);
    });
  });

};
