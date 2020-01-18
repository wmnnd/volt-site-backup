var NBTabs = (function(options) {

  var defaults = {
    selector: '[data-nb-tabs]'
  }

  var emitEvent = function (tab, content) {
    var event = new CustomEvent('tabbed', {
      bubbles: true,
      cancelable: true,
      detail: {
        tab: tab,
        content: content
      }
    });

    tab.dispatchEvent(event);
  };

  var setupTab = function(tab, content) {
    if (!tab.id) {
      tab.id = 'nb-tab_' + content.id;
    }
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', content.id);
    content.setAttribute('role', 'tabpanel');
    content.setAttribute('aria-labelledby', tab.id);

    if (tab.matches('.is-active')) {
      tab.setAttribute('aria-selected', 'true');
    } else {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      content.setAttribute('hidden', 'hidden');
    }
  };

  var show = function(tab, content, focus) {
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('is-active');
    content.removeAttribute('hidden');
    if (focus) {
      tab.focus();
    }
  };

  var hide = function(newTab) {
    var tabGroup = newTab.closest('[role="tablist"]');
    if (!tabGroup) return;
    var tab = tabGroup.querySelector('[role="tab"][aria-selected="true"]');
    if (!tab) return;
    var content = document.querySelector(tab.hash);

    // Hide the tab
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
    tab.classList.remove('is-active');

    // Hide the content
    if (!content) return;
    content.setAttribute('hidden', 'hidden');
  };

  var toggle = function(tab, focus) {
    if (!tab || tab.getAttribute('aria-selected') == 'true') return;

    var content = document.querySelector(tab.hash);
    if (!content) return;

    hide(tab);

    show(tab, content, focus);

    emitEvent(tab, content);
  };

  var getTabsMap = function (tab) {
    var tabGroup = tab.closest('[role="tablist"]');
    var tabs = tabGroup ? tabGroup.querySelectorAll('[role="tab"]') : null;
    if (!tabs) return;
    return {
      tabs: tabs,
      index: Array.prototype.indexOf.call(tabs, tab)
    };
  };

  var switchTabs = function (tab, key) {
    var tabsMap = getTabsMap(tab);
    if (!tabsMap) return;
    var length = tabsMap.tabs.length - 1;
    var index;

    if (['ArrowUp', 'ArrowLeft', 'Up', 'Left'].indexOf(key) > -1) {
      index = tabsMap.index < 1 ? length : tabsMap.index - 1;
    }

    else if (['ArrowDown', 'ArrowRight', 'Down', 'Right'].indexOf(key) > -1) {
      index = tabsMap.index === length ? 0 : tabsMap.index + 1;
    }

    else if (key === 'Home') {
      index = 0;
    }

    else if (key === 'End') {
      index = length;
    }

    toggle(tabsMap.tabs[index], true);
  };

  var Constructor = function(selector) {
    var publicAPIs = {};
    var tabGroup;

    publicAPIs.setup = function() {
      tabGroup = document.querySelector(selector);
      if (!tabGroup) return;
      var tabs = tabGroup.querySelectorAll('a');
      tabGroup.setAttribute('role', 'tablist');
      Array.prototype.forEach.call(tabs, function(tab) {
        var content = document.querySelector(tab.hash);
        if (!content) return;
        setupTab(tab, content);
      });
    };

    publicAPIs.rotate = function(value) {
      var rotateTabs = getTabsMap(tabGroup);
      var totalTabs = rotateTabs.tabs.length - 1;
      var currentIndex = rotateTabs.index;
      setInterval(function() {
        if (currentIndex < totalTabs) {
          currentIndex++;
          toggle(rotateTabs.tabs[currentIndex], false);
        } else {
          toggle(rotateTabs.tabs[0], false);
          currentIndex = 0;
        }
      }, 8000);
    }

    var clickHandler = function(event) {
      var tab = event.target.closest(selector + ' [role="tab"]');
      if (!tab) return;
      event.preventDefault();
      toggle(tab);
    };

    var keyHandler = function (event) {
      var tab = document.activeElement;
      if (!tab.matches(selector + ' [role="tab"]')) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right', 'Home', 'End'].indexOf(event.key) < 0) return;
      event.preventDefault();
      switchTabs(tab, event.key);
    };

    var init = function() {
      publicAPIs.setup();
      document.addEventListener('click', clickHandler, true);
      tabGroup.addEventListener('keydown', keyHandler, true);
    };

    if (window.matchMedia('(min-width: 992px)').matches) {
      init();
    }

    return publicAPIs;
  };

  return Constructor;
})();
