## Overview
The intention of this project is to access, store and render the data posted by the [Moscow Exchange](https://www.moex.com/en/) (Copyright © [Moscow Exchange](https://www.moex.com/en/), 2011 - 2020, stock exchange, bonds, foreign exchange - forex, futures, options, ETFs etc.) [Informational & Statistical Server (ISS) API (© Moscow Exchange)](https://www.moex.com/a2920) for the scientific research and analysis.

Before you start interacting with the [Moscow Exchange website](https://www.moex.com/en/), please read these carefully:
- [MOEX (Copyright © Moscow Exchange, 2011 - 2020) User Agreement](https://assets.moex.com/agreements/en/agreement.pdf) (en)
- [MOEX (Copyright © Moscow Exchange, 2011 - 2020) User Agreement](https://fs.moex.com/f/3499/agreement.pdf) (ru)
- [ISS API Developer manual (© Moscow Exchange)](https://fs.moex.com/files/8888) (en)
- [ISS API Developer manual (© Moscow Exchange)](https://fs.moex.com/files/6523) (ru)
- [ISS API Reference (© Moscow Exchange)](http://iss.moex.com/iss/reference) (ru)
- [ISS API Sample code (© Moscow Exchange)](https://fs.moex.com/files/6524)

## Screenshots
<!-- https://stackoverflow.com/questions/14494747/add-images-to-readme-md-on-github -->
<!-- <td><img src="https://github.com/nrsharip/iss-web/blob/master/prtsc/prtsc_0002.png?raw=true" width="25%"></td> -->

<table>
<tr>
  <td><img src="/misc/prtsc_0001.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0002.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0003.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0004.png?raw=true" width="100%"></td>
</tr>
<tr>
  <td><img src="/misc/prtsc_0005.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0006.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0007.png?raw=true" width="100%"></td>
  <td><img src="/misc/prtsc_0008.png?raw=true" width="100%"></td>
</tr>
</table>

## Table of contents
1. [High level design diagram](#high-level-design-diagram)
1. [Prerequisites](#prerequisites)
   1. [Install Git](#install-git)
   2. [Install Node.JS](#install-nodejs)
   3. [Install Python](#install-python)
      1. [Install Django Python module](#install-django-python-module)
      2. [Install mysqlclient Python module](#install-mysqlclient-python-module)
   4. [Install MySQL Community Server](#install-mysql-community-server)
   5. [Install ElasticSearch](#install-elasticsearch)
   6. [Install Postman](#install-postman)
2. [Project installation](#project-installation)
3. [Run the server with the moex app](#run-the-server-with-the-moex-app)
4. [License](#license)

## High level design diagram
<img src="/misc/iss-web.png?raw=true" width="100%">

## Prerequisites
The following is the list of software required for the correct and convenient work with the project:   
### Install Git
1. Go to [Git Download Website](https://git-scm.com/downloads)
2. Download and install the appropriate version of [Git](https://git-scm.com/)
### Install Node.JS
1. Go to [Node.JS Download Website](https://nodejs.org/en/download/)
2. Download and install the appropriate version of [Node.JS](https://nodejs.org/en/)
### Install Python
1. Go to [Python Download Website](https://www.python.org/downloads/)
2. Download and install the appropriate version of [Python](https://www.python.org)
   <!-- https://stackoverflow.com/questions/50544499/how-to-make-a-styled-markdown-admonition-box-in-a-github-gist -->
   > :warning: **WINDOWS: executable installer vs. embeddable zip file**: It is better to download and use the executable installer since it will have the necessary modules within (like `pip`). With embeddable zip file you'll have to manually download the essential modules.
3. Check the version of `python` installed:
   ```
   python --version
   ```
4. Check the version of `pip` installed with `python`:
   ```
   python -m pip --version
   ```
#### Install Django Python module
1. See section [Install Python](#install-python) to get the core `python`
2. See [Django Installation Page](https://docs.djangoproject.com/en/3.0/topics/install/#installing-official-release)
3. After `python` is installed, run the following commands from shell to install Django: 
   <!-- https://www.shellhacks.com/pip-install-specific-version-of-package/ -->
   - check the versions of Django available:
     ```
     python -m pip install Django==
     ```
     output should look like:
     ```
     Collecting Django==
     ERROR: Could not find a version that satisfies the requirement Django== 
     (from versions: 1.1.3, 1.1.4, 1.2, 1.2.1, 1.2.2, 1.2.3, 1.2.4, 1.2.5, 1.2.6, 1.2.7, 1.3, 1.3.1, 1.3.2, 1.3.3, 1.3.4, 1.3.5, 1.3.6, 1.3.7, 1.4, 1.4.1, 1.4.2, 1.4.3, 1.4.4, 1.4.5, 1.4.6, 1.4.7, 1.4.8, 1.4.9, 1.4.10, 1.4.11, 1.4.12, 1.4.13, 1.4.14, 1.4.15, 1.4.16, 1.4.17, 1.4.18, 1.4.19, 1.4.20, 1.4.21, 1.4.22, 1.5, 1.5.1, 1.5.2, 1.5.3, 1.5.4,
     1.5.5, 1.5.6, 1.5.7, 1.5.8, 1.5.9, 1.5.10, 1.5.11, 1.5.12, 1.6, 1.6.1, 1.6.2, 1.6.3, 1.6.4, 1.6.5, 1.6.6, 1.6.7, 1.6.8, 1.6.9, 1.6.10, 1.6.11, 1.7, 1.7.1, 1.7.2, 1.7.3, 1.7.4, 1.7.5, 1.7.6, 1.7.7, 1.7.8, 1.7.9, 1.7.10, 1.7.11, 1.8a1, 1.8b1, 1.8b2, 1.8rc1, 1.8, 1.8.1, 1.8.2, 1.8.3, 1.8.4, 1.8.5, 1.8.6, 1.8.7, 1.8.8, 1.8.9, 1.8.10, 1.8.11,
     1.8.12, 1.8.13, 1.8.14, 1.8.15, 1.8.16, 1.8.17, 1.8.18, 1.8.19, 1.9a1, 1.9b1, 1.9rc1, 1.9rc2, 1.9, 1.9.1, 1.9.2, 1.9.3, 1.9.4, 1.9.5, 1.9.6, 1.9.7, 1.9.8, 1.9.9, 1.9.10, 1.9.11, 1.9.12, 1.9.13, 1.10a1, 1.10b1, 1.10rc1, 1.10, 1.10.1, 1.10.2, 1.10.3, 1.10.4, 1.10.5, 1.10.6, 1.10.7, 1.10.8, 1.11a1, 1.11b1, 1.11rc1, 1.11, 1.11.1, 1.11.2, 1.11.3,
     1.11.4, 1.11.5, 1.11.6, 1.11.7, 1.11.8, 1.11.9, 1.11.10, 1.11.11, 1.11.12, 1.11.13, 1.11.14, 1.11.15, 1.11.16, 1.11.17, 1.11.18, 1.11.20, 1.11.21, 1.11.22, 1.11.23, 1.11.24, 1.11.25, 1.11.26, 1.11.27, 1.11.28, 1.11.29, 2.0a1, 2.0b1, 2.0rc1, 2.0, 2.0.1, 2.0.2, 2.0.3, 2.0.4, 2.0.5, 2.0.6, 2.0.7, 2.0.8, 2.0.9, 2.0.10, 2.0.12, 2.0.13, 2.1a1, 2.1b1,
     2.1rc1, 2.1, 2.1.1, 2.1.2, 2.1.3, 2.1.4, 2.1.5, 2.1.7, 2.1.8, 2.1.9, 2.1.10, 2.1.11, 2.1.12, 2.1.13, 2.1.14, 2.1.15, 2.2a1, 2.2b1, 2.2rc1, 2.2, 2.2.1, 2.2.2, 2.2.3, 2.2.4, 2.2.5, 2.2.6, 2.2.7, 2.2.8, 2.2.9, 2.2.10, 2.2.11, 2.2.12, 2.2.13, 3.0a1, 3.0b1, 3.0rc1, 3.0, 3.0.1, 3.0.2, 3.0.3, 3.0.4, 3.0.5, 3.0.6, 3.0.7, 3.1a1, 3.1b1)
     ERROR: No matching distribution found for Django==
     WARNING: You are using pip version 19.2.3, however version 20.1.1 is available.
     You should consider upgrading via the 'python -m pip install --upgrade pip' command.
     ```
   - this project is created with Django v.3.0.6, so to install run the following command:
     ```
     python -m pip install Django==3.0.6
     ```
   - after Django is installed, check the version with the following command:
     ```
     python -m django --version
     ```
     <!-- https://stackoverflow.com/questions/5226311/installing-specific-package-versions-with-pip -->
   - to uninstall the module (for any reason, e.g. reinstall etc.), run: 
     ```
     python -m pip uninstall Django
     ```
#### Install mysqlclient Python module
1. See section [Install Python](#install-python) to get the core `python`
2. See [Django MySQL DB API Drivers](https://docs.djangoproject.com/en/3.0/ref/databases/#mysql-db-api-drivers)
3. See [mysqlclient on PyPI](https://pypi.org/project/mysqlclient/)
4. `mysqlclient` is a native driver. It’s the recommended choice.
5. After `python` is installed, run the following commands from shell to install `mysqlclient`:
   - check the versions of `mysqlclient` available:
     ```
     python -m pip install mysqlclient==
     ```
   - Django requires `mysqlclient` 1.3.13 or later, install the latest `mysqlclient`:
     ```
     python -m pip install mysqlclient
     ```
### Install MySQL Community Server
1. Go to [MySQL Community Server Download Website](https://dev.mysql.com/downloads/mysql/)
2. Download the archive of appropriate version of [MySQL Community Server](https://dev.mysql.com/)
3. Unzip the archive to folder `mysql-X.X.XX-some-os` and set `PATH` pointing to the `mysql-X.X.XX-some-os\bin`
4. See [Starting the Server page](https://dev.mysql.com/doc/refman/8.0/en/starting-server.html) and try to start the server
   > :warning: **WINDOWS: known issues**: 
   <br>[ERROR] [MY-013276] [Server] Failed to set datadir to 'mysql-8.0.20-winx64\data\' (OS errno: 2 - No such file or directory) 
   <br> 1. See [Installing MySQL on Microsoft Windows Using a noinstall ZIP Archive](https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html) and 
   [Starting the Server for the First Time](https://dev.mysql.com/doc/refman/8.0/en/windows-server-first-start.html)
   <br> 2. See [Creating an Option File](https://dev.mysql.com/doc/refman/8.0/en/windows-create-option-file.html). The ZIP archive does not include a data directory. To initialize a MySQL installation by creating the data directory and populating the tables in the mysql system database, initialize MySQL using either `--initialize` or `--initialize-insecure`. 
   <br> 3. See Section 2.10.1, ["Initializing the Data Directory"](https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization.html).
   <br> 4. On Windows, suppose that `mysql-X.X.XX-some-os\my.ini` contains these lines:
     ```
     [mysqld]
     # set basedir to your installation path
     basedir=disc:\\path\\mysql-X.X.XX-some-os
     # set datadir to the location of your data directory
     datadir=disc:\\path\\mysql-X.X.XX-some-os\\data
     ```
   > Then invoke `mysqld` as follows (enter the command on a single line with the `--defaults-file` option first):
     ```
     bin\mysqld --defaults-file=disc:\path\mysql-X.X.XX-some-os\my.ini --initialize-insecure --user=mysql --console
     ```
   > the output should look like:
     ```
     0 [System] [MY-013169] [Server] mysql-8.0.20-winx64\bin\mysqld.exe (mysqld 8.0.20) initializing of server in progress as process 9564
     1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
     1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
     6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
     ```
5. Post-Initialization root Password Assignment
   1. Start the server. For instructions, see Section 2.10.2, [Starting the Server](https://dev.mysql.com/doc/refman/8.0/en/starting-server.html).
   2. Connect to the server:
      - If you used `--initialize` but not `--initialize-insecure` to initialize the `data` directory, connect to the server as `root`:
        ```
        mysql -u root -p
        ```
        Then, at the password prompt, enter the random password that the server generated during the initialization sequence:
        ```
        Enter password: (enter the random root password here)
        ```
        Look in the server error log if you do not know this password.
      - If you used `--initialize-insecure` to initialize the `data` directory, connect to the server as `root` without a password:
        ```
        mysql -u root --skip-password
        ```
   3. After connecting, use an `ALTER USER` statement to assign a new `root` password:
      ```
      ALTER USER 'root'@'localhost' IDENTIFIED BY 'root-password';
      ```
### Install ElasticSearch
1. See [Getting started with Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)
2. Go to [Download Elasticsearch](https://www.elastic.co/downloads/elasticsearch)
3. Download the archive of appropriate version of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)
4. Extract the archive to the folder: `elasticsearch-X.X.X-some-os` and set `PATH` pointing to the `elasticsearch-X.X.X-some-os\elasticsearch-X.X.X\bin`
5. In case you plan to run the server on the host other than `localhost` add/change the following lines in `elasticsearch-X.X.X-some-os\elasticsearch-X.X.X\config\elasticsearch.yml`
   ```
   network.host: ip1.ip2.ip3.ip4
   http.port: XXXX
   discovery.seed_hosts: ["127.0.0.1", "ip1.ip2.ip3.ip4", "[::1]"]
   ```
   where ip1.ip2.ip3.ip4 - is the IP address to run the instance of ElasticSearch on.
   > :warning: **Running ElasticSearch on a custom host**: make sure the correct URL is supplied for the ElasticSearch instance in [`moex/static/moex/scripts/global.js`](moex/static/moex/scripts/global.js#L271)
   
6. Add the following lines to `elasticsearch-X.X.X-some-os\elasticsearch-X.X.X\config\elasticsearch.yml` to enable CORS and allow origin
   ```
   http.cors.enabled: true
   http.cors.allow-origin: /https?:\/\/(localhost)?(127\.0\.0\.1)?(ip1\.ip2\.ip3\.ip4)?(:[0-9]+)?/
   ```
   where ip1.ip2.ip3.ip4 - is the IP address of the Django Web Server from which the HTTP requests would come to ElasticSearch.
   > :warning: **Running Django server on a custom host**: make sure the correct host for the server is listed in [`web_server_moex/settings.py`](web_server_moex/settings.py#L28)
   
   See [Configuring Elasticsearch » HTTP](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html) for more details.
7. It is advisible to increase the heap size (default 1G) of JVM the ElasticSearch is running on by changing the following parameters in `elasticsearch-X.X.X-some-os\elasticsearch-X.X.X\config\jvm.options`
   ```
   -Xms5g # from -Xms1g
   -Xmx5g # from -Xmx1g
   ```
   see the [Issue: Configure a limit on direct memory usage #41954](https://github.com/elastic/elasticsearch/issues/41954) and [-XX:MaxDirectMemorySize](https://www.eclipse.org/openj9/docs/xxmaxdirectmemorysize/)
### Install Postman
Postman is an effective tool to send different kinds of HTTP requests to REST APIs. Especially it comes in handy when dealing with ElasticSearch since ES exposes the REST API for management and quering the data. 
1. Go to [Postman Download page](https://www.postman.com/downloads/)
2. Download and install the latest version
## Project installation
1. Have MySQL Community Server up and running. 

   For details see [Install MySQL Community Server](#install-mysql-community-server) and [Starting the Server](https://dev.mysql.com/doc/refman/8.0/en/starting-server.html)
2. Have ElasticSearch up and running. 

   For details see [Install ElasticSearch](#install-elasticsearch) and [Get Elasticsearch up and running](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html)
3. `git clone` this repository:
   ```
   git clone https://github.com/nrsharip/iss-web.git
   ```
4. Run `npm install` in the root of the cloned repository. This will create `node_modules` in the root with the downloaded dependencies. 
   - See [`package.json`](package.json#L27) for the list of dependencies. 
   - See [`web_server_moex/settings.py`](web_server_moex/settings.py#L138): Django's `STATICFILES_DIRS` points to `node_modules`.
5. Connect to MySQL Community Server with `mysql` client:
   ```
   mysql -u root -p
   ```
   or
   ```
   mysql -u root --skip-password
   ```
6. Create the management database for the Django project (for now only Django's system apps will have records there). 

   Perform the following commands while in `mysql`:
   ```
   mysql> CREATE DATABASE IF NOT EXISTS db_moex;
   mysql> CREATE USER IF NOT EXISTS 'db_moex_user'@'localhost' IDENTIFIED BY 'moex_is_cool';
   mysql> GRANT ALTER, CREATE, DELETE, DROP, INSERT, SELECT, UPDATE, REFERENCES, INDEX ON db_moex.* TO 'db_moex_user'@'localhost';
   mysql> SHOW GRANTS FOR 'db_moex_user'@'localhost';
          +--------------------------------------------------------------------------------------------------------+
          | Grants for db_moex_user@localhost                                                                      |
          +--------------------------------------------------------------------------------------------------------+
          | GRANT USAGE ON *.* TO `db_moex_user`@`localhost`                                                       |
          | GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON `db_moex`.* TO `db_moex_user`@`localhost` |
          +--------------------------------------------------------------------------------------------------------+
          2 rows in set (0.00 sec)
   ```
   in case you need to delete the newly created database/user (e.g. you made a typo and want to re-CREATE), use the following commands:
   ```
   mysql> DROP DATABASE IF EXISTS db_moex;
   mysql> DROP USER IF EXISTS db_moex_user;
   ```
7. In case: 
   - MySQL Community Server is running on a host other than `localhost` 
   - Database's name is different (not `db_moex`)
   - User's name/password is different (not `'db_moex_user'@'localhost'`/`'moex_is_cool'`)
   
   check and update [`web_server_moex/settings.py`](web_server_moex/settings.py#L84):
   ```
   DATABASES = {
     'default': {
       'ENGINE': 'django.db.backends.mysql',
       'NAME': 'db_moex',
       'USER': 'db_moex_user',
       'PASSWORD': 'moex_is_cool',
       'HOST': '127.0.0.1',
       'PORT': '3306',
     }
   }
   ```
8. Create the models (tables in MySQL Server DB) for the Django's system apps (see the list in [`web_server_moex/settings.py`](web_server_moex/settings.py#L35)). 

   From the local repo root run the following command:
   ```
   python manage.py migrate
   ```
   The output should look like:
   ```
   Operations to perform:
     Apply all migrations: admin, auth, contenttypes, sessions
   Running migrations:
     Applying contenttypes.0001_initial... OK
     Applying auth.0001_initial... OK
     Applying admin.0001_initial... OK
     Applying admin.0002_logentry_remove_auto_add... OK
     Applying admin.0003_logentry_add_action_flag_choices... OK
     Applying contenttypes.0002_remove_content_type_name... OK
     Applying auth.0002_alter_permission_name_max_length... OK
     Applying auth.0003_alter_user_email_max_length... OK
     Applying auth.0004_alter_user_username_opts... OK
     Applying auth.0005_alter_user_last_login_null... OK
     Applying auth.0006_require_contenttypes_0002... OK
     Applying auth.0007_alter_validators_add_error_messages... OK
     Applying auth.0008_alter_user_username_max_length... OK
     Applying auth.0009_alter_user_last_name_max_length... OK
     Applying auth.0010_alter_group_name_max_length... OK
     Applying auth.0011_update_proxy_permissions... OK
     Applying sessions.0001_initial... OK
   ```
9.  Check with `mysql` that the tables are created in `db_moex` (or any other name specified earlier):
    ```
    mysql> SHOW TABLES IN db_moex;
      +----------------------------+
      | Tables_in_db_moex          |
      +----------------------------+
      | auth_group                 |
      | auth_group_permissions     |
      | auth_permission            |
      | auth_user                  |
      | auth_user_groups           |
      | auth_user_user_permissions |
      | django_admin_log           |
      | django_content_type        |
      | django_migrations          |
      | django_session             |
      +----------------------------+
      10 rows in set (0.00 sec)
    ```
    ```
    mysql> SELECT * FROM db_moex.auth_permission;
      +----+-------------------------+-----------------+--------------------+
      | id | name                    | content_type_id | codename           |
      +----+-------------------------+-----------------+--------------------+
      |  1 | Can add log entry       |               1 | add_logentry       |
      |  2 | Can change log entry    |               1 | change_logentry    |
      |  3 | Can delete log entry    |               1 | delete_logentry    |
      |  4 | Can view log entry      |               1 | view_logentry      |
                                         ...
      | 21 | Can add session         |               6 | add_session        |
      | 22 | Can change session      |               6 | change_session     |
      | 23 | Can delete session      |               6 | delete_session     |
      | 24 | Can view session        |               6 | view_session       |
      +----+-------------------------+-----------------+--------------------+
      24 rows in set (0.00 sec)
    ```
    etc. for other tables in the database
10. Also following command might come in handy:
    - `python manage.py sqlmigrate admin 0001`
    
      This command prints the SQL code that is executed for a particular migrate stage:
      ```
      --
      -- Create model LogEntry
      --
      CREATE TABLE `django_admin_log` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `action_time` datetime(6) NOT NULL, `object_id` longtext NULL, `object_repr` varchar(200) NOT NULL, `action_flag` smallint UNSIGNED NOT NULL CHECK (`action_flag` >= 0), `change_message` longtext NOT NULL, `content_type_id` integer NULL, `user_id` integer NOT NULL);
      ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);
      ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
      ```
    - `python manage.py check`
    
      This command checks for any problems in your project without making migrations or touching the database.
11. Create admin user for the django project:
    ```
    python manage.py createsuperuser
    ```
    with the following questions to answer:
    ```
    Username (leave blank to use 'shari'): admin
    Email address: admin@example.com
    Password:
    Password (again):
    Superuser created successfully.
    ```
    For more details on Django management see this [tutorial](https://docs.djangoproject.com/en/3.0/intro/tutorial02/#creating-an-admin-user)
## Run the server with the moex app
1. Make sure MySQL Community Server is up and running. 

   For details see [Install MySQL Community Server](#install-mysql-community-server) and [Starting the Server](https://dev.mysql.com/doc/refman/8.0/en/starting-server.html)
2. Make sure ElasticSearch is up and running. 

   For details see [Install ElasticSearch](#install-elasticsearch) and [Get Elasticsearch up and running](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html)
3. In the local repo root run the command:
   ```
   python manage.py runserver
   ```
   output:
   ```
   Watching for file changes with StatReloader
   Performing system checks...

   System check identified no issues (0 silenced).
   June 27, 2020 - 12:35:52
   Django version 3.0.6, using settings 'web_server_moex.settings'
   Starting development server at http://127.0.0.1:8000/
   Quit the server with CTRL-BREAK.
   ```
   There's also an option to run on a different host:port. 
   > :warning: **Running Django server on a custom host**: make sure the correct host for the server is listed in [`web_server_moex/settings.py`](web_server_moex/settings.py#L28) 
   ```
   python manage.py runserver 192.168.196.146:8000
   ```
   output:
   ```
   Watching for file changes with StatReloader
   Performing system checks...

   System check identified no issues (0 silenced).
   June 27, 2020 - 12:35:52
   Django version 3.0.6, using settings 'web_server_moex.settings'
   Starting development server at http://192.168.196.146:8000/
   Quit the server with CTRL-BREAK.
   ```
4. Available urls are:
   - root Django project routing is set in [`web_server_moex/urls.py`](web_server_moex/urls.py#L19) 
   - moex app routing is set in [`moex/urls.py`](moex/urls.py#L5) (views: [`moex/views.py`](moex/views.py#L11), templates: [`moex/templates/moex`](moex/templates/moex))
5. Use [Postman](https://learning.postman.com/docs/postman/launching-postman/introduction/) to manage your instance of ElasticSearch:
   <img src="/misc/prtsc_0008.png?raw=true" width="75%">
   - See [Postman: Documentation](https://learning.postman.com/docs/postman/launching-postman/introduction/)
   - Import the Postman assets for this project from [`postman`](postman)
     - See [Postman: Importing and exporting data](https://learning.postman.com/docs/postman/collections/importing-and-exporting-data/)
     - See [Postman: Using variables](https://learning.postman.com/docs/postman/variables-and-environments/variables/)
     - See [Postman: Managing environments](https://learning.postman.com/docs/postman/variables-and-environments/managing-environments/)
## License
This project is available under the [MIT license](LICENSE) © Nail Sharipov
