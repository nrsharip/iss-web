## Overview
The intention of this project is to access, store and render the data posted by the [Moscow Exchange](https://www.moex.com/en/) [Informational & Statistical Server (ISS) API](https://www.moex.com/a2920) for the scientific research and analysis.

Before you start interacting with the [Moscow Exchange website](https://www.moex.com/en/), please read these carefully:
- [MOEX User Agreement](https://assets.moex.com/agreements/en/agreement.pdf) (en)
- [MOEX User Agreement](https://fs.moex.com/f/3499/agreement.pdf) (ru)
- [ISS API Developer manual](https://fs.moex.com/files/8888) (en)
- [ISS API Developer manual](https://fs.moex.com/files/6523) (ru)
- [ISS API Reference](http://iss.moex.com/iss/reference) (ru)
- [ISS API Sample code](https://fs.moex.com/files/6524)

## Screenshots
<!-- https://stackoverflow.com/questions/14494747/add-images-to-readme-md-on-github -->
<!-- <td><img src="https://github.com/nrsharip/iss-web/blob/master/prtsc/prtsc_0002.png?raw=true" width="25%"></td> -->

<table>
<tr>
  <td><img src="/prtsc/prtsc_0001.png?raw=true" width="100%"></td>
  <td><img src="/prtsc/prtsc_0002.png?raw=true" width="100%"></td>
  <td><img src="/prtsc/prtsc_0003.png?raw=true" width="100%"></td>
  <td><img src="/prtsc/prtsc_0004.png?raw=true" width="100%"></td>
</tr>
<tr>
  <td><img src="/prtsc/prtsc_0005.png?raw=true" width="100%"></td>
  <td><img src="/prtsc/prtsc_0006.png?raw=true" width="100%"></td>
  <td><img src="/prtsc/prtsc_0007.png?raw=true" width="100%"></td>
  <td></td>
</tr>
</table>

## Table of contents
1. [Prerequisites](#prerequisites)
   1. [Install Git](#install-git)
   2. [Install Node.JS](#install-nodejs)
   3. [Install Python](#install-python)
      1. [Install Django Python module](#install-django-python-module)
      2. [Install mysqlclient Python module](#install-mysqlclient-python-module)
   4. [Install MySQL Server](#install-mysql-server)
   5. [Install ElasticSearch](#install-elasticsearch)
   6. [Install Postman](#install-postman)
2. [Project installation](#project-installation)
3. [Run the server with the moex app](#run-the-server-with-the-moex-app)
4. [License](#License)

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
### Install MySQL Server
### Install ElasticSearch
### Install Postman

## Project installation
- git clone repo **AND** npm install
**OR**
- npm install repo

## Run the server with the moex app

## License
This project is available under the [MIT license](LICENSE) © Nail Sharipov
