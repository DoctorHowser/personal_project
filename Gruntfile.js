module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/queue.js',
                dest: 'server/public/assets/scripts/queue.min.js'
            },
            register: {
                src: ['client/scripts/registration/register.js',
                    'client/scripts/registration/auth-service.js',
                    'client/scripts/registration/form.js'],
                dest: 'server/public/assets/scripts/register.min.js'
            },
            instructor: {
                src: ['client/scripts/instructor/instructor.js',
                    'client/scripts/instructor/passwordmatch.js'],
                dest: 'server/public/assets/scripts/instructor.min.js'
            },
            student: {
                src: ['client/scripts/student/student.js',
                    'client/scripts/student/passwordmatch.js'],
                dest: 'server/public/assets/scripts/student.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/*.js',
                dest: 'server/public/assets/scripts/controllers.min.js'
            },
            factories: {
                src: 'client/scripts/factories/*.js',
                dest: 'server/public/assets/scripts/factories.min.js'
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angular_ui: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-ui-bootstrap/ui-bootstrap-tpls.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            angularMessages: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-messages/angular-messages.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules/angular-route/',
                src: [
                    "angular-route.min.js",
                    "angular-route.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                dest: "server/public/vendors/"
            },
            css: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/style.css"
                ],
                "dest": "server/public/assets/"
            },
            html: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/*.html",
                    "views/*/*",
                    "views/*/*/*"
                ],
                "dest": "server/public/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};