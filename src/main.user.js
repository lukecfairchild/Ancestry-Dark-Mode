// ==UserScript==
// @name         Ancestry Dark Mode
// @version      0.4
// @description  Injects custom CSS into ancestry.com to make it more of a dark mode
// @author       Luke Fairchild
// @include      https://www.ancestry.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
	'use strict'

	const setCSS = function (css) {

		if (typeof GM_addStyle != 'undefined') {
			GM_addStyle(css)

		} else if (typeof PRO_addStyle != 'undefined') {
			PRO_addStyle(css)

		} else if (typeof addStyle != 'undefined') {
			addStyle(css)

		} else {
			const element = document.createElement('style')
			const heads   = document.getElementsByTagName('head')

			element.type = 'text/css'
			element.appendChild(document.createTextNode(css))

			if (heads.length > 0) {
				heads[0].appendChild(element)

			// no head yet, stick it whereever
			} else {
				document.documentElement.appendChild(element)
			}
		}
	}

	const cachedCSS = GM_getValue('Ancestry.Dark.Mode.Styles', null)

	if (cachedCSS) {
		setCSS(cachedCSS)
	}

	GM_xmlhttpRequest ({
		method : 'GET',
		url    : 'https://raw.githubusercontent.com/lukecfairchild/Ancestry-Dark-Mode/master/src/Styles.css',
		onload : function (responseDetails) {

			const pulledCSS = responseDetails.responseText

			if (pulledCSS !== cachedCSS) {
				GM_setValue('Ancestry.Dark.Mode.Styles', pulledCSS)
				setCSS(pulledCSS)
			}
		}
	})
})()
