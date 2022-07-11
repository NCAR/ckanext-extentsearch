from setuptools import setup, find_packages

setup(
    name='ckanext-extentsearch',
    version='0.1.0',
    description='CKAN extension for temporal extent facet',
    long_description=
    '''
    ''',
    classifiers=[],  # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='ckan ckanext extentsearch facet',
    author='Mikael Karlsson',
    author_email='i8myshoes@gmail.com',
    url='https://github.com/NCAR/ckanext-extentsearch',
    license='AGPLv3',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    namespace_packages=['ckanext', 'ckanext.extentsearch'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        # -*- Extra requirements: -*-
    ],
    entry_points=
    '''
    [ckan.plugins]
    extentsearch=ckanext.extentsearch.plugin:ExtentSearchPlugin
    ''',
)
