'use strict'

require('./helpers/dom')

const test = require('tap').test
const sinon = require('sinon')
const React = require('react')
const TestUtils = require('react-addons-test-utils');
const subject = require('../dist/Tag')

let instance
let callback

const data = {
  tag: { name: 'Benin' },
  onDelete: sinon.stub(),
  classNames: { tag: 'tag', tagName: 'tag-name' }
}

function run () {
  instance = TestUtils.renderIntoDocument(
    React.createElement(subject, data)
  )
}

test('Tag', (t) => {
  t.test('renders a button', (t) => {
    run()

    const button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button')
    t.ok(button.classList.contains(data.classNames.tag), 'with given outer class name')

    const span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span')
    t.ok(span.classList.contains(data.classNames.tagName), 'with given inner class name')
    t.equal(span.textContent, data.tag.name, 'with given text')

    t.end()
  })

  t.test('on click', (t) => {
    run()

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(instance, 'button'))
    t.ok(data.onDelete.calledOnce, 'triggers given callback')

    t.end()
  })

  t.end()
})
