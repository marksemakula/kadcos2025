import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Breadcrumb Component with BreadcrumbList Schema
 * Provides visible navigation breadcrumbs and structured data for SEO/sitelinks
 */

// Route configuration for breadcrumbs
const routeConfig = {
  '/': { name: 'Home', parent: null },
  '/about': { name: 'About Us', parent: '/' },
  '/services': { name: 'Services & Products', parent: '/' },
  '/membership': { name: 'Membership', parent: '/' },
  '/blog': { name: 'Blog & Updates', parent: '/' },
  '/vote': { name: 'Vote', parent: '/' },
  '/contact': { name: 'Contact Us', parent: '/' },
  '/governance': { name: 'Governance', parent: '/about' },
  '/resources-e-lib': { name: 'Resources & E-Library', parent: '/services' },
  '/managers-message': { name: "Manager's Message", parent: '/about' },
  '/board-chair-message': { name: "Board Chair's Message", parent: '/about' },
}

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation()
  const currentPath = location.pathname

  // Build breadcrumb trail
  const buildBreadcrumbTrail = (path) => {
    const trail = []
    let currentRoute = path

    while (currentRoute) {
      const config = routeConfig[currentRoute]
      if (config) {
        trail.unshift({
          path: currentRoute,
          name: config.name,
        })
        currentRoute = config.parent
      } else {
        break
      }
    }

    return trail
  }

  // Use custom items if provided, otherwise build from route
  const breadcrumbs = customItems || buildBreadcrumbTrail(currentPath)

  // Generate BreadcrumbList schema
  const generateSchema = () => {
    const baseUrl = 'https://kadcoslubaga.co.ug'
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    }
  }

  // Inject structured data into head
  useEffect(() => {
    // Don't add schema on home page
    if (currentPath === '/' && !customItems) return

    // Remove any existing breadcrumb schema
    const existingSchema = document.querySelector('script[data-breadcrumb-schema]')
    if (existingSchema) {
      existingSchema.remove()
    }

    // Add new breadcrumb schema
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-breadcrumb-schema', 'true')
    script.textContent = JSON.stringify(generateSchema())
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      const schemaScript = document.querySelector('script[data-breadcrumb-schema]')
      if (schemaScript) {
        schemaScript.remove()
      }
    }
  }, [currentPath, customItems])

  // Don't render breadcrumbs on home page
  if (currentPath === '/' && !customItems) {
    return null
  }

  return (
    /* Visible Breadcrumb Navigation */
    <nav
      aria-label="Breadcrumb navigation"
      className="bg-gray-50 border-b border-gray-200"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol
            className="flex flex-wrap items-center space-x-2 text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              const isFirst = index === 0

              return (
                <li
                  key={item.path}
                  className="flex items-center"
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  {!isFirst && (
                    <svg
                      className="w-4 h-4 text-gray-400 mx-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  {isLast ? (
                    <span
                      className="text-gray-600 font-medium"
                      itemProp="name"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-primary hover:text-orange-600 hover:underline font-medium transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">
                        {isFirst ? (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Home
                          </span>
                        ) : (
                          item.name
                        )}
                      </span>
                    </Link>
                  )}

                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
  )
}

export default Breadcrumb
