import setuptools

with open('README.md', 'r', encoding='utf-8') as fh:
    long_description = fh.read()

setuptools.setup(
    name='zhiva',
    author='Kemal Erdem, Piotr Mazurek',
    author_email='kemalpiro@gmail.com',
    description='Library for easy visualization and interaction of machine learning models with medical data',
    keywords=["machine learning", "visualization", "medical imaging", "medical ai"],
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/burnpiro/zhiva',
    project_urls={
        'Documentation': 'https://docs.zhiva.org',
        'Bug Reports': 'https://github.com/burnpiro/zhiva/issues',
        'Source Code': 'https://github.com/burnpiro/zhiva',
    },
    package_dir={'': 'src'},
    packages=setuptools.find_packages(where='src'),
    classifiers=[
        # see https://pypi.org/classifiers/
        'Development Status :: 3 - Alpha',

        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        'Topic :: Scientific/Engineering :: Medical Science Apps.',
        'Topic :: Scientific/Engineering :: Visualization',

        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.12',
        'Programming Language :: Python :: 3 :: Only',
        'License :: OSI Approved :: Apache Software License',
    ],
    license="Apache License 2.0",
    python_requires='>=3.11',
    # install_requires=['Pillow'],
    extras_require={
        'dev': ['check-manifest'],
        # 'test': ['coverage'],
    },
    # entry_points={
    #     'console_scripts': [  # This can provide executable scripts
    #         'run=examplepy:main',
    # You can execute `run` in bash to run `main()` in src/examplepy/__init__.py
    #     ],
    # },
)