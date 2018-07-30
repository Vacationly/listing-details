module.exports = function (grunt) {
  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>',
      },
      build: {
        cwd: 'public',
        src: '**',
      },
    },
  });
};
