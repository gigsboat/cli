import { getConfig } from '../bin/config-manager.js'
import { formatToMarkdown, getEventsMd } from '../src/utils/md-formatter.js'

test('convert json object to markdown formatting', async () => {
  const json = [
    {
      h1: 'great title'
    },
    {
      p: 'and my paragraph is cool'
    }
  ]
  const markdown = formatToMarkdown(json)
  expect(markdown).toMatchSnapshot()
})

test('process events json data to provide a complete markdown document', async () => {
  const events = [
    {
      year: 2016,
      items: [
        {
          attributes: {
            date: new Date('2016-01-01'),
            title: 'title',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: 'https://example.com',
            country_code: 'US',
            language: null
          }
        }
      ],
      stats: {
        total: 1
      }
    },
    {
      year: 2021,
      items: [
        {
          attributes: {
            date: new Date('2021-02-01'),
            title: 'title',
            type: 'conference',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: null,
            country_code: null,
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'meetup',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'podcast',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'article',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'webinar',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'webinar',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'workshop',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-03'),
            title: 'title',
            type: 'workshop',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        }
      ],
      stats: {
        total: 8,
        total_podcast: 1,
        total_conference: 1,
        total_webinar: 2,
        total_meetup: 1,
        total_article: 1,
        total_workshop: 2,
        total_other: 0
      }
    }
  ]

  const markdown = await getEventsMd(events)
  expect(markdown).toMatchSnapshot()
})

test('process events images', async () => {
  const myConfig = {
    output: {
      includePictureGalleryYearly: true
    }
  }

  // @TODO what we actually need to do is refactor config-manager.js
  // to really have a getConfig that reads from a processed config
  // so it doesn't re-evaluate all the time, but then also have a
  // setConfig that allows to override the config
  await getConfig(myConfig)

  const events = [
    {
      year: 2016,
      items: [
        {
          attributes: {
            date: new Date('2016-01-01'),
            title: 'title',
            type: 'conference',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: 'https://example.com',
            country_code: 'US',
            language: null,
            images: [
              'https://pbs.twimg.com/media/CbgOxYzWAAAjvgp?format=jpg&name=4096x4096',
              'https://pbs.twimg.com/media/CbgOy-pXEAE4PVp?format=jpg&name=4096x4096'
            ]
          }
        }
      ],
      stats: {
        total: 1
      }
    },
    {
      year: 2017,
      items: [
        {
          attributes: {
            date: new Date('2017-01-01'),
            title: 'title',
            name: 'name',
            type: 'conference',
            slides_url: 'https://example.com',
            recording_url: 'https://example.com',
            country_code: 'US',
            language: null
          }
        }
      ],
      stats: {
        total: 1
      }
    },
    {
      year: 2021,
      items: [
        {
          attributes: {
            date: new Date('2021-02-01'),
            title: 'title',
            type: 'conference',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: null,
            country_code: null,
            language: 'English',
            images: [
              'https://pbs.twimg.com/media/CbgOxYzWAAAjvgp?format=jpg&name=4096x4096'
            ]
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            type: 'meetup',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English',
            images: [
              'https://pbs.twimg.com/media/CbgOy-pXEAE4PVp?format=jpg&name=4096x4096'
            ]
          }
        }
      ],
      stats: {
        total: 2,
        total_podcast: 0,
        total_conference: 1,
        total_webinar: 0,
        total_meetup: 1,
        total_article: 0,
        total_workshop: 0,
        total_other: 0
      }
    }
  ]

  const markdown = await getEventsMd(events)
  expect(markdown).toMatchSnapshot()
})
