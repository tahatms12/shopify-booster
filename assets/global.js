// Global JavaScript for Auto Enhance Hub Theme

class CartDrawer {
  constructor() {
    this.drawer = document.querySelector('#cart-drawer');
    this.openTriggers = document.querySelectorAll('[data-cart-drawer-open]');
    this.closeTriggers = document.querySelectorAll('[data-cart-drawer-close]');
    this.overlay = document.querySelector('#cart-drawer-overlay');

    this.bindEvents();
  }

  bindEvents() {
    this.openTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    this.closeTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    if (this.drawer) {
      this.drawer.classList.add('is-open');
      document.body.classList.add('cart-drawer-open');
      this.focusFirstElement();
    }
  }

  close() {
    if (this.drawer) {
      this.drawer.classList.remove('is-open');
      document.body.classList.remove('cart-drawer-open');
    }
  }

  isOpen() {
    return this.drawer && this.drawer.classList.contains('is-open');
  }

  focusFirstElement() {
    const firstFocusable = this.drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
}

class CartAPI {
  constructor() {
    this.routes = window.routes || {};
  }

  async add(items) {
    const response = await fetch(this.routes.cart_add_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async update(updates) {
    const response = await fetch(this.routes.cart_update_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ updates })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async change(id, quantity) {
    const response = await fetch(this.routes.cart_change_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ id, quantity })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get() {
    const response = await fetch('/cart.js');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

class QuickAddToCart {
  constructor() {
    this.cartAPI = new CartAPI();
    this.init();
  }

  init() {
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('quick-add-form') || e.target.querySelector('.quick-add-btn')) {
        e.preventDefault();
        this.handleSubmit(e.target);
      }
    });
  }

  async handleSubmit(form) {
    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const id = formData.get('id');
    const quantity = parseInt(formData.get('quantity') || '1');

    if (!id) return;

    // Add loading state
    this.setLoadingState(button, true);

    try {
      await this.cartAPI.add([{ id, quantity }]);
      this.showSuccessMessage();
      this.updateCartCount();
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showErrorMessage(error.message);
    } finally {
      this.setLoadingState(button, false);
    }
  }

  setLoadingState(button, loading) {
    if (loading) {
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span> Adding...';
    } else {
      button.disabled = false;
      button.innerHTML = 'Quick Add';
    }
  }

  showSuccessMessage() {
    // Simple success indication - you can enhance this
    const event = new CustomEvent('cart:added', {
      detail: { message: 'Item added to cart successfully!' }
    });
    document.dispatchEvent(event);
  }

  showErrorMessage(message) {
    const event = new CustomEvent('cart:error', {
      detail: { message: message || 'Error adding item to cart' }
    });
    document.dispatchEvent(event);
  }

  async updateCartCount() {
    try {
      const cart = await this.cartAPI.get();
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }
}

class PredictiveSearch {
  constructor() {
    this.searchInput = document.querySelector('#search-input');
    this.searchResults = document.querySelector('#search-results');
    this.debounceTimer = null;
    
    if (this.searchInput) {
      this.init();
    }
  }

  init() {
    this.searchInput.addEventListener('input', (e) => {
      this.debounceSearch(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.length > 0) {
        this.showResults();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.hideResults();
      }
    });
  }

  debounceSearch(query) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    if (query.length < 2) {
      this.hideResults();
      return;
    }

    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`);
      const data = await response.json();
      
      this.displayResults(data.resources.results.products || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displayResults(products) {
    if (!this.searchResults) return;

    if (products.length === 0) {
      this.searchResults.innerHTML = '<div class="p-4 text-gray-500">No products found</div>';
    } else {
      this.searchResults.innerHTML = products.map(product => `
        <a href="${product.url}" class="flex items-center p-3 hover:bg-gray-50">
          <img src="${product.featured_image}" alt="${product.title}" class="w-12 h-12 object-cover rounded mr-3">
          <div>
            <div class="font-medium">${product.title}</div>
            <div class="text-sm text-gray-600">${this.formatPrice(product.price)}</div>
          </div>
        </a>
      `).join('');
    }

    this.showResults();
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price / 100);
  }

  showResults() {
    if (this.searchResults) {
      this.searchResults.classList.remove('hidden');
    }
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.classList.add('hidden');
    }
  }
}

class RevealAnimation {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.observer = null;
    
    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in-up');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }
}

// Notification system
class NotificationSystem {
  constructor() {
    this.container = this.createContainer();
    this.bindEvents();
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(container);
    return container;
  }

  bindEvents() {
    document.addEventListener('cart:added', (e) => {
      this.show('success', e.detail.message);
    });

    document.addEventListener('cart:error', (e) => {
      this.show('error', e.detail.message);
    });
  }

  show(type, message, duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `
      notification p-4 rounded-lg shadow-lg max-w-sm
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
      transform translate-x-full opacity-0 transition-all duration-300
    `;
    
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span>${message}</span>
        <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `;

    this.container.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.remove('translate-x-full', 'opacity-0');
    }, 10);

    // Auto remove
    setTimeout(() => {
      this.remove(notification);
    }, duration);
  }

  remove(notification) {
    notification.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart functionality
  new CartDrawer();
  new QuickAddToCart();
  
  // Initialize search
  new PredictiveSearch();
  
  // Initialize animations if enabled
  if (document.body.dataset.animationsEnabled !== 'false') {
    new RevealAnimation();
  }
  
  // Initialize notifications
  new NotificationSystem();
});

// Utility functions
window.theme = {
  formatMoney: (cents) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(cents / 100);
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};