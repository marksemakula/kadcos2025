// src/pages/AdminCMS.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth.jsx'; // Updated import
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiFileText, FiUsers, FiSettings, FiBookOpen, FiEdit, FiSave, FiX, FiImage, FiPlus, FiTrash2 } = FiIcons;

const AdminCMS = () => {
  const [activeSection, setActiveSection] = useState('blog');
  const [blogPosts, setBlogPosts] = useState([]);
  const [resources, setResources] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load data from localStorage or API
      const savedBlogPosts = JSON.parse(localStorage.getItem('cms_blogPosts') || '[]');
      const savedResources = JSON.parse(localStorage.getItem('cms_resources') || '[]');
      let savedLeadership = JSON.parse(localStorage.getItem('cms_leadership') || '[]');
      const savedServices = JSON.parse(localStorage.getItem('cms_services') || '[]');

      // If no leadership in localStorage, use the same default as Governance page
      if (savedLeadership.length === 0) {
        savedLeadership = [
          // Executive Committee
          { id: 1, name: "Mrs. Nseerikomawa Josephine", position: "Board Chairperson", image: "/images/Nseerikomawa_Josephine.jpg", bio: "Experienced leader providing strategic direction and oversight.", category: "executive" },
          { id: 2, name: "Council Jude Mbabaali", position: "Vice Chairperson", image: "/images/Jude_Mbabaali.jpg", bio: "Supports the chairperson in governance and strategic planning.", category: "executive" },
          { id: 3, name: "Ms. Namaganda Justine", position: "Secretary", image: "", bio: "Responsible for documentation and official communications.", category: "executive" },
          { id: 4, name: "Mr. Tenywa Herman Musisi", position: "Treasurer", image: "", bio: "Manages financial oversight and fiscal responsibility.", category: "executive" },
          { id: 5, name: "Mr. Budde Harry Dominic", position: "Member", image: "", bio: "Committee member contributing to strategic decisions.", category: "executive" },
          { id: 6, name: "Mrs. Kalanda Annette Kizza", position: "Member", image: "", bio: "Committee member with focus on member welfare.", category: "executive" },
          { id: 7, name: "Mr. Ssekamatte Patrick", position: "Member", image: "", bio: "Committee member providing operational insights.", category: "executive" },
          { id: 8, name: "Mr. Mutebi Emmanuel", position: "Member", image: "", bio: "Committee member with community development expertise.", category: "executive" },
          { id: 9, name: "Mr. Mukalazi Vienny", position: "Member", image: "", bio: "Committee member focused on growth initiatives.", category: "executive" },
          // Supervisory Committee
          { id: 10, name: "Mr. Gerald Katusabe", position: "Supervisory Committee", image: "/images/Gerald_Katusabe.jpg", bio: "Oversees compliance and operational integrity.", category: "supervisory" },
          { id: 11, name: "Mrs. Josephine Sekatuba", position: "Supervisory Committee", image: "", bio: "Ensures regulatory compliance and best practices.", category: "supervisory" },
          { id: 12, name: "Mrs. Rose Ssali", position: "Supervisory Committee", image: "", bio: "Monitors operational efficiency and member satisfaction.", category: "supervisory" },
          // Management and Staff
          { id: 13, name: "Mr. Dumba Patrick", position: "Manager", image: "/images/PatrickDdumba.png", bio: "Business development specialist focused on expanding cooperative services.", category: "management" },
          { id: 14, name: "Ms. Nyago Mary Goretti", position: "Accountant", image: "", bio: "Manages financial records and reporting.", category: "management" },
          { id: 15, name: "Ms. Namukasa Proscovia", position: "Credit Officer", image: "", bio: "Handles credit assessments and loan management.", category: "management" },
          { id: 16, name: "Ms. Kansiime Anna", position: "Assistant Credit Officer", image: "", bio: "Supports credit operations and member services.", category: "management" },
          { id: 17, name: "Ms. Namugga Maria", position: "Cashier", image: "", bio: "Manages daily transactions and member accounts.", category: "management" },
          { id: 18, name: "Ms. Nanyonga Gladys", position: "Cashier", image: "", bio: "Handles financial transactions and customer service.", category: "management" },
          { id: 19, name: "Ms. Nyago Grace", position: "Support Staff", image: "", bio: "Provides operational support and maintenance.", category: "management" },
          { id: 20, name: "Ms. Nabagereka Victoria", position: "Office Attendant/Receptionist", image: "", bio: "Dedicated to providing exceptional service and support to our members.", category: "management" }
        ];
      }

      setBlogPosts(savedBlogPosts);
      setResources(savedResources);
      setLeadership(savedLeadership);
      setServices(savedServices);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAdd = () => {
    setEditingItem(getDefaultItem(activeSection));
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = getCurrentData().filter(item => item.id !== id);
      updateData(updatedData);
      toast.success('Item deleted successfully');
    }
  };

  const handleSave = (formData) => {
    const currentData = getCurrentData();
    let updatedData;

    if (formData.id) {
      // Update existing item
      updatedData = currentData.map(item => 
        item.id === formData.id ? { ...item, ...formData, updatedAt: new Date().toISOString() } : item
      );
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updatedData = [...currentData, newItem];
    }

    updateData(updatedData);
    setShowForm(false);
    setEditingItem(null);
    toast.success('Item saved successfully');
  };

  const getCurrentData = () => {
    switch (activeSection) {
      case 'blog': return blogPosts;
      case 'resources': return resources;
      case 'leadership': return leadership;
      case 'services': return services;
      default: return [];
    }
  };

  const updateData = (updatedData) => {
    const key = `cms_${activeSection}`;
    switch (activeSection) {
      case 'blog':
        setBlogPosts(updatedData);
        saveData('cms_blogPosts', updatedData);
        break;
      case 'resources':
        setResources(updatedData);
        saveData('cms_resources', updatedData);
        break;
      case 'leadership':
        setLeadership(updatedData);
        saveData('cms_leadership', updatedData);
        break;
      case 'services':
        setServices(updatedData);
        saveData('cms_services', updatedData);
        break;
    }
  };

  const getDefaultItem = (section) => {
    const defaults = {
      blog: {
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: 'News'
      },
      resources: {
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'PDF',
        size: '0 MB',
        author: '',
        category: 'Financial Reports',
        fileUrl: ''
      },
      leadership: {
        name: '',
        position: '',
        image: '',
        bio: '',
        category: 'executive'
      },
      services: {
        title: '',
        description: '',
        maxPeriod: '',
        interestRate: '',
        icon: 'FiDollarSign',
        requirements: []
      }
    };
    return { ...defaults[section] };
  };

  const sections = [
    { id: 'blog', name: 'Blog/News', icon: FiFileText, description: 'Manage blog posts and news updates' },
    { id: 'resources', name: 'Resources', icon: FiBookOpen, description: 'Manage resources and documents' },
    { id: 'leadership', name: 'Leadership', icon: FiUsers, description: 'Manage leadership team information' },
    { id: 'services', name: 'Services', icon: FiSettings, description: 'Manage services and loan products' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-marcellus">Loading CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/KADCOS-02.png" 
                alt="KADCOS Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-secondary font-marcellus">
                KADCOS Content Management System
              </h1>
            </div>
            <div className="text-sm text-gray-600 font-marcellus">
              Welcome, {user?.email}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setActiveSection(section.id)}
              className={`p-6 rounded-lg text-left transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow hover:shadow-md'
              }`}
            >
              <SafeIcon 
                icon={section.icon} 
                className={`text-2xl mb-3 ${
                  activeSection === section.id ? 'text-white' : 'text-primary'
                }`} 
              />
              <h3 className="text-lg font-semibold font-marcellus mb-2">
                {section.name}
              </h3>
              <p className={`text-sm ${
                activeSection === section.id ? 'text-gray-100' : 'text-gray-500'
              } font-marcellus`}>
                {section.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary font-marcellus">
                {sections.find(s => s.id === activeSection)?.name} Management
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-marcellus"
              >
                <SafeIcon icon={FiPlus} />
                <span>Add New</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeSection === 'blog' && (
              <ContentList
                items={blogPosts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={['Title', 'Author', 'Date', 'Category']}
                renderItem={(item) => ({
                  title: item.title,
                  author: item.author,
                  date: new Date(item.date).toLocaleDateString(),
                  category: item.category
                })}
              />
            )}

            {activeSection === 'resources' && (
              <ContentList
                items={resources}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={['Title', 'Type', 'Category', 'Date']}
                renderItem={(item) => ({
                  title: item.title,
                  type: item.type,
                  category: item.category,
                  date: new Date(item.date).toLocaleDateString()
                })}
              />
            )}

            {activeSection === 'leadership' && (
              <div>
                {['executive', 'supervisory', 'management'].map((cat) => {
                  const catLabel =
                    cat === 'executive' ? 'Executive Committee'
                    : cat === 'supervisory' ? 'Supervisory Committee'
                    : 'Management and Staff';
                  const catItems = leadership.filter(l => l.category === cat);
                  return (
                    <div key={cat} className="mb-8">
                      <h3 className="text-lg font-bold mb-4 text-secondary">{catLabel}</h3>
                      <ContentList
                        items={catItems}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        columns={['Name', 'Position', 'Bio']}
                        renderItem={(item) => ({
                          name: item.name,
                          position: item.position,
                          bio: item.bio
                        })}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {activeSection === 'services' && (
              <ContentList
                items={services}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={['Title', 'Interest Rate', 'Max Period']}
                renderItem={(item) => ({
                  title: item.title,
                  interestRate: item.interestRate,
                  maxPeriod: item.maxPeriod
                })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ContentForm
          section={activeSection}
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

// Content List Component
const ContentList = ({ items, onEdit, onDelete, columns, renderItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <SafeIcon icon={FiFileText} className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-500 font-marcellus mb-2">
          No items found
        </h3>
        <p className="text-gray-400 font-marcellus">
          Get started by adding your first item.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-marcellus">
                {column}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-marcellus">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {Object.values(renderItem(item)).map((value, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-marcellus">
                  {value}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-primary hover:text-secondary font-marcellus flex items-center space-x-1"
                  >
                    <SafeIcon icon={FiEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800 font-marcellus flex items-center space-x-1"
                  >
                    <SafeIcon icon={FiTrash2} />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Content Form Component
const ContentForm = ({ section, item, onSave, onCancel }) => {
  const [formData, setFormData] = useState(item || {});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        {formData.image !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange('image', reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
            />
            {formData.image && (
              <div className="mt-2">
                <span className="text-xs text-gray-500">Image selected</span>
              </div>
            )}
          </div>
        )}
      </>
    );

    switch (section) {
      case 'blog':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Content *
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  required
                />
              </div>
            </div>
            {commonFields}
          </>
        );

      case 'resources':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Type
                </label>
                <select
                  value={formData.type || 'PDF'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOC">DOC</option>
                  <option value="XLS">XLS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Size
                </label>
                <input
                  type="text"
                  value={formData.size || ''}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="e.g., 2.4 MB"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Category
                </label>
                <select
                  value={formData.category || 'Financial Reports'}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                >
                  <option value="Financial Reports">Financial Reports</option>
                  <option value="Strategic Documents">Strategic Documents</option>
                  <option value="Educational Materials">Educational Materials</option>
                  <option value="Product Guides">Product Guides</option>
                  <option value="Newsletters">Newsletters</option>
                  <option value="Analytical Reports">Analytical Reports</option>
                  <option value="Testimonials">Testimonials</option>
                </select>
              </div>
            </div>
            {commonFields}
          </>
        );

      case 'leadership':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => handleChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Category
              </label>
              <select
                value={formData.category || 'executive'}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              >
                <option value="executive">Executive Committee</option>
                <option value="supervisory">Supervisory Committee</option>
                <option value="management">Management Staff</option>
              </select>
            </div>
            {commonFields}
          </>
        );

      case 'services':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Max Period
                </label>
                <input
                  type="text"
                  value={formData.maxPeriod || ''}
                  onChange={(e) => handleChange('maxPeriod', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="e.g., 12 months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                  Interest Rate
                </label>
                <input
                  type="text"
                  value={formData.interestRate || ''}
                  onChange={(e) => handleChange('interestRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="e.g., 2% per month"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                Requirements
              </label>
              {(formData.requirements || []).map((req, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('requirements', index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-marcellus"
                  >
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem('requirements')}
                className="mt-2 flex items-center space-x-2 text-primary hover:text-secondary font-marcellus"
              >
                <SafeIcon icon={FiPlus} />
                <span>Add Requirement</span>
              </button>
            </div>
            {commonFields}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-secondary font-marcellus">
            {item?.id ? 'Edit' : 'Add New'} {section.charAt(0).toUpperCase() + section.slice(1)} Item
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {renderFormFields()}

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-marcellus"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 font-marcellus"
            >
              <SafeIcon icon={saving ? FiSave : FiSave} className={saving ? 'animate-spin' : ''} />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminCMS;