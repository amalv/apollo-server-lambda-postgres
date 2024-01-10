# [1.26.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.25.1...v1.26.0) (2024-01-10)


### Features

* add support for verifying access token using jwksUri ([cd63c28](https://github.com/amalv/apollo-server-lambda-postgres/commit/cd63c28f8f0a5c2cef6886b72b2105a5d7bbf738))
* **scripts:** add load-fixtures:staging script and support .env.staging in db.ts ([ba15c93](https://github.com/amalv/apollo-server-lambda-postgres/commit/ba15c93644af5e1ac7c0637edbb99541356aa96c))

## [1.25.1](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.25.0...v1.25.1) (2024-01-08)


### Bug Fixes

* Move @faker-js/faker from devDependencies to dependencies ([828d006](https://github.com/amalv/apollo-server-lambda-postgres/commit/828d006c5d841de5a0eb2275ecce78749e898af2))

# [1.25.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.24.0...v1.25.0) (2024-01-08)


### Features

* add AdminResolvers with loadFixtures mutation ([3882c1a](https://github.com/amalv/apollo-server-lambda-postgres/commit/3882c1aa10e66c641264a333f7e52b8bf7115684))

# [1.24.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.23.0...v1.24.0) (2024-01-05)


### Features

* migrate favorite resolvers from TypeORM to Drizzle ORM ([a223c7b](https://github.com/amalv/apollo-server-lambda-postgres/commit/a223c7bd0fc58e627c424f21ea3435f2b362e134))

# [1.23.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.22.0...v1.23.0) (2024-01-05)


### Features

* migrate from TypeORM to Drizzle ORM ([868e2a4](https://github.com/amalv/apollo-server-lambda-postgres/commit/868e2a4dc41e669627de79d4ffd27e4ea0c9d688))

# [1.22.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.21.0...v1.22.0) (2024-01-04)


### Features

* set lib and target in tsconfig to es2020 ([9a8f724](https://github.com/amalv/apollo-server-lambda-postgres/commit/9a8f72458a24f4db603c3d6c35291e5156748ddf))

# [1.21.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.20.0...v1.21.0) (2024-01-04)


### Features

* **Book:** add isFavorited to GraphQL schema and resolver ([750f299](https://github.com/amalv/apollo-server-lambda-postgres/commit/750f299386d9eeb16a1b197ddc4e57470c750d96))

# [1.20.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.19.0...v1.20.0) (2024-01-04)


### Features

* add FixtureDataSource with synchronize option ([15d4941](https://github.com/amalv/apollo-server-lambda-postgres/commit/15d49413aaf27bf0673bfbbabde54cd2e0f8bca1))

# [1.19.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.18.0...v1.19.0) (2023-12-29)


### Features

* **favoriteService:** add getFavorites, addFavorite, and removeFavorite operations ([0eb75e7](https://github.com/amalv/apollo-server-lambda-postgres/commit/0eb75e73513b3e2f3ed3b3b2bbf7b9b305a40992))

# [1.18.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.17.0...v1.18.0) (2023-12-29)


### Features

* enhance User and Favorite Resolvers and Update Fixtures ([9d378ce](https://github.com/amalv/apollo-server-lambda-postgres/commit/9d378ce0328272bc1ea37796f549eae2de49edbf))

# [1.17.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.16.1...v1.17.0) (2023-12-28)


### Features

* Add Favorite entity, resolver, and relations ([118b0dd](https://github.com/amalv/apollo-server-lambda-postgres/commit/118b0dd34dca6c7ddde710566dcba4a35884da2c))

## [1.16.1](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.16.0...v1.16.1) (2023-12-22)


### Bug Fixes

* update search query to use OR instead of AND ([f1f2fa7](https://github.com/amalv/apollo-server-lambda-postgres/commit/f1f2fa7e9bb38583a6090e5597472ccbd914d851))

# [1.16.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.15.0...v1.16.0) (2023-12-22)


### Features

* refactor book query to include author search and change default limit to 50 ([c3981b1](https://github.com/amalv/apollo-server-lambda-postgres/commit/c3981b11c553f5a5336e9c0411973a4927719ed1))

# [1.15.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.14.0...v1.15.0) (2023-12-21)


### Features

* add pagination to books query ([c932693](https://github.com/amalv/apollo-server-lambda-postgres/commit/c932693c62e9440cf31d7d4b9807340b74a619de))

# [1.14.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.13.0...v1.14.0) (2023-12-18)


### Features

* refactor book data loading and fetching ([f61fa58](https://github.com/amalv/apollo-server-lambda-postgres/commit/f61fa5854fd266e35704fae6ff1120ae688dd4b5))

# [1.13.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.12.0...v1.13.0) (2023-12-17)


### Features

* refactor book query to filter by title ([ed29b15](https://github.com/amalv/apollo-server-lambda-postgres/commit/ed29b1591f9217544252b579a3328fe12526b60e))

# [1.12.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.11.0...v1.12.0) (2023-12-14)


### Features

* add book covers and update book data ([4bb20b0](https://github.com/amalv/apollo-server-lambda-postgres/commit/4bb20b069910a59a1a975be3a4b629bc23e4a859))

# [1.11.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.10.0...v1.11.0) (2023-12-13)


### Features

* add production fixtures loading command and refactor logging path ([e6dd54d](https://github.com/amalv/apollo-server-lambda-postgres/commit/e6dd54d69c7fcce5068634c6228429c70e0c253a))

# [1.10.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.9.0...v1.10.0) (2023-12-13)


### Features

* **scripts:** reorganize scripts, improve fixtures, add fetch covers script ([b886316](https://github.com/amalv/apollo-server-lambda-postgres/commit/b886316c365891f964f46913bd67c609be06fae6))

# [1.9.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.8.0...v1.9.0) (2023-12-12)


### Features

* add support for book fixtures configuration ([b77130f](https://github.com/amalv/apollo-server-lambda-postgres/commit/b77130fee357c4402d1e643be2d1db6c2841de92))

# [1.8.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.7.0...v1.8.0) (2023-11-27)


### Features

* enable GraphQL instrospection in Apollo Server ([976a3eb](https://github.com/amalv/apollo-server-lambda-postgres/commit/976a3eb9d5322b494455432a4a783902277a9d36))

# [1.7.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.6.0...v1.7.0) (2023-10-31)


### Features

* enhance environment configuration and database synchronization ([5c8e1d3](https://github.com/amalv/apollo-server-lambda-postgres/commit/5c8e1d32349a8309e289f7601188b1071b44a19c))

# [1.6.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.5.0...v1.6.0) (2023-10-31)


### Features

* enhance environment configuration and documentation ([07d77a9](https://github.com/amalv/apollo-server-lambda-postgres/commit/07d77a98cab823b9112d6860cf9eb3f3f23f773e))

# [1.5.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.4.0...v1.5.0) (2023-10-31)


### Features

* add data-source.ts to handle TypeORM DataSource ([7565812](https://github.com/amalv/apollo-server-lambda-postgres/commit/756581244429da6fa2f1691085356b3ac69fb2f4))

# [1.4.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.3.0...v1.4.0) (2023-10-31)


### Features

* add User resolver to GraphQL schema ([bcc41d5](https://github.com/amalv/apollo-server-lambda-postgres/commit/bcc41d5d4c64b17d14395ef1791efa57a2ff4b75))

# [1.3.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.2.0...v1.3.0) (2023-10-31)


### Features

* integrate TypeORM with serverless ([2bfd763](https://github.com/amalv/apollo-server-lambda-postgres/commit/2bfd763315094285380d3f371bd87f1de84a69ac))

# [1.2.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.1.1...v1.2.0) (2023-10-19)


### Features

* add tests, dbInfo query, and types ([f68f113](https://github.com/amalv/apollo-server-lambda-postgres/commit/f68f1131f04ccd5b1f82f8881d82523a45deadd4))

## [1.1.1](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.1.0...v1.1.1) (2023-10-18)


### Bug Fixes

* update DB_SSL_CERT path in serverless.yml ([f980663](https://github.com/amalv/apollo-server-lambda-postgres/commit/f98066327f6e779539fe163fd68d3d52be03cc29))

# [1.1.0](https://github.com/amalv/apollo-server-lambda-postgres/compare/v1.0.0...v1.1.0) (2023-10-18)


### Features

* Add DB_SSL_CERT to .env_sample and update environment for serverless parameters ([1735427](https://github.com/amalv/apollo-server-lambda-postgres/commit/1735427ee9ac0a5982870095608232f1e4fb1ae3))

# 1.0.0 (2023-10-18)


### Features

* add AWS RDS PostgreSQL connection and certs ([ce83c0f](https://github.com/amalv/apollo-server-lambda-postgres/commit/ce83c0fd568e7fcf34a36e6ef2641213140b3d34))
* add support for Semantic Release ([b2e66f7](https://github.com/amalv/apollo-server-lambda-postgres/commit/b2e66f7fe3ff5ccca5c4515015fbc9faf00a14f9))
* initial commit ([82ea575](https://github.com/amalv/apollo-server-lambda-postgres/commit/82ea575e8991500cd06a1bb956c8d16bbadffd81))

# 1.0.0 (2023-10-18)

### Features

- add AWS RDS PostgreSQL connection and certs ([ce83c0f](https://github.com/amalv/apollo-server-lambda-postgres/commit/ce83c0fd568e7fcf34a36e6ef2641213140b3d34))
- add support for Semantic Release ([b2e66f7](https://github.com/amalv/apollo-server-lambda-postgres/commit/b2e66f7fe3ff5ccca5c4515015fbc9faf00a14f9))
- initial commit ([82ea575](https://github.com/amalv/apollo-server-lambda-postgres/commit/82ea575e8991500cd06a1bb956c8d16bbadffd81))

# 1.0.0 (2023-10-18)

### Features

- add AWS RDS PostgreSQL connection and certs ([ce83c0f](https://github.com/amalv/apollo-server-lambda-postgres/commit/ce83c0fd568e7fcf34a36e6ef2641213140b3d34))
- add support for Semantic Release ([b2e66f7](https://github.com/amalv/apollo-server-lambda-postgres/commit/b2e66f7fe3ff5ccca5c4515015fbc9faf00a14f9))
- initial commit ([82ea575](https://github.com/amalv/apollo-server-lambda-postgres/commit/82ea575e8991500cd06a1bb956c8d16bbadffd81))
