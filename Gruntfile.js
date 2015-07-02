/**
 * Created by jose on 16/04/15.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        karma: {
            options: {
                // point all tasks to karma config file
                configFile: 'test/karma.conf.js'
            },
            unit: {
                // run tests once instead of continuously
                singleRun: true
            }
        }
    });

    // load the Grunt task
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma:unit']);
};