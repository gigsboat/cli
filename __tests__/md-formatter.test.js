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

test('process events json data to provide a complete markdown document', () => {
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
        }
      ],
      stats: {
        total: 6,
        total_podcast: 1,
        total_conference: 1,
        total_webinar: 2,
        total_meetup: 1,
        total_article: 1,
        total_other: 0
      }
    }
  ]

  const markdown = getEventsMd(events)
  expect(markdown).toMatchSnapshot()
})
