import('/all/search.js').then(({ loadSearch }) => {
  const modal = Object.assign(document.createElement('dialog'), {
    className: 'search-modal'
  })
  const form = Object.assign(document.createElement('form'), {
    className: 'search-wrapper',
    method: 'dialog',
    autocomplete: 'off'
  })
  const search = Object.assign(document.createElement('input'), {
    className: 'search',
    type: 'search',
    placeholder: 'Search everything',
    ariaLabel: 'Search everything'
  })
  const suggestions = Object.assign(document.createElement('div'), {
    className: 'suggestions no-results'
  })
  form.append(search, suggestions)
  modal.append(form)
  modal.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close()
    }
  })

  loadSearch(search, form, suggestions)

  document.body.append(modal)
  modal.showModal()
  search.focus()
})
