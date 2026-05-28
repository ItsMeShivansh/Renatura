"use client";

import { useState } from "react";
import { products as initialProducts, categories } from "@/data/products";
import { coreStandards as initialStandards, merchantCredentials as initialCredentials } from "@/data/certifications";
import { Package, Link as LinkIcon, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Award, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  
  // State for all dynamic entities
  const [products, setProducts] = useState(initialProducts);
  const [links, setLinks] = useState([
    { id: 1, title: "Amazon Storefront", url: "https://amazon.in" },
    { id: 2, title: "Flipkart Storefront", url: "https://flipkart.com" },
  ]);
  const [standards, setStandards] = useState(initialStandards);
  const [credentials, setCredentials] = useState(initialCredentials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      if (activeTab === "products") {
        setFormData({
          id: Date.now(), name: "", category: categories[1], dimensions: "",
          material: "", moq: "", price: "", certification: "", buyUrl: "", image: "/products/placeholder.svg",
        });
      } else if (activeTab === "links") {
        setFormData({ id: Date.now(), title: "", url: "" });
      } else if (activeTab === "standards") {
        setFormData({ id: Date.now(), code: "", description: "" });
      } else if (activeTab === "credentials") {
        setFormData({ id: Date.now(), title: "", description: "" });
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === "products") {
      if (editingItem) setProducts(products.map((p) => (p.id === formData.id ? formData : p)));
      else setProducts([{ ...formData, id: Date.now() }, ...products]);
    } else if (activeTab === "links") {
      if (editingItem) setLinks(links.map((l) => (l.id === formData.id ? formData : l)));
      else setLinks([{ ...formData, id: Date.now() }, ...links]);
    } else if (activeTab === "standards") {
      if (editingItem) setStandards(standards.map((s) => (s.id === formData.id ? formData : s)));
      else setStandards([{ ...formData, id: Date.now() }, ...standards]);
    } else if (activeTab === "credentials") {
      if (editingItem) setCredentials(credentials.map((c) => (c.id === formData.id ? formData : c)));
      else setCredentials([{ ...formData, id: Date.now() }, ...credentials]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    if (activeTab === "products") setProducts(products.filter((p) => p.id !== id));
    else if (activeTab === "links") setLinks(links.filter((l) => l.id !== id));
    else if (activeTab === "standards") setStandards(standards.filter((s) => s.id !== id));
    else if (activeTab === "credentials") setCredentials(credentials.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === "products" ? "bg-green text-black" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <Package className="w-5 h-5" /> Products
          </button>
          <button
            onClick={() => setActiveTab("standards")}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === "standards" ? "bg-green text-black" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <Award className="w-5 h-5" /> Product Standards
          </button>
          <button
            onClick={() => setActiveTab("credentials")}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === "credentials" ? "bg-green text-black" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <ShieldCheck className="w-5 h-5" /> Merchant Credentials
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
              activeTab === "links" ? "bg-green text-black" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <LinkIcon className="w-5 h-5" /> Quick Links
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-foreground/5 border border-foreground/10 p-6 rounded-sm">
            <div>
              <h2 className="text-xl font-bold text-foreground capitalize">
                Manage {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-green text-black text-sm font-bold rounded-sm transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          <div className="bg-background border border-foreground/10 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-foreground">
                <thead className="bg-foreground/5 text-foreground/70 text-xs uppercase border-b border-foreground/10">
                  <tr>
                    {activeTab === "products" && (
                      <><th className="px-6 py-4 font-medium">Product</th><th className="px-6 py-4 font-medium">Category</th><th className="px-6 py-4 font-medium">Price</th></>
                    )}
                    {activeTab === "links" && (
                      <><th className="px-6 py-4 font-medium">Title</th><th className="px-6 py-4 font-medium">URL</th></>
                    )}
                    {activeTab === "standards" && (
                      <><th className="px-6 py-4 font-medium">Standard Code</th><th className="px-6 py-4 font-medium">Description</th></>
                    )}
                    {activeTab === "credentials" && (
                      <><th className="px-6 py-4 font-medium">Title</th><th className="px-6 py-4 font-medium">Description</th></>
                    )}
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {activeTab === "products" && products.map((item) => (
                    <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4 font-medium flex items-center gap-4"><ImageIcon className="w-4 h-4 text-foreground/30" />{item.name}</td>
                      <td className="px-6 py-4 text-foreground/70">{item.category}</td>
                      <td className="px-6 py-4 text-foreground/70">{item.price}</td>
                      <td className="px-6 py-4 text-right"><ActionButtons item={item} onEdit={handleOpenModal} onDelete={handleDelete} /></td>
                    </tr>
                  ))}
                  {activeTab === "links" && links.map((item) => (
                    <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.title}</td>
                      <td className="px-6 py-4 text-foreground/70">{item.url}</td>
                      <td className="px-6 py-4 text-right"><ActionButtons item={item} onEdit={handleOpenModal} onDelete={handleDelete} /></td>
                    </tr>
                  ))}
                  {activeTab === "standards" && standards.map((item) => (
                    <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-green">{item.code}</td>
                      <td className="px-6 py-4 text-foreground/70 max-w-sm truncate">{item.description}</td>
                      <td className="px-6 py-4 text-right"><ActionButtons item={item} onEdit={handleOpenModal} onDelete={handleDelete} /></td>
                    </tr>
                  ))}
                  {activeTab === "credentials" && credentials.map((item) => (
                    <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.title}</td>
                      <td className="px-6 py-4 text-foreground/70 max-w-sm truncate">{item.description}</td>
                      <td className="px-6 py-4 text-right"><ActionButtons item={item} onEdit={handleOpenModal} onDelete={handleDelete} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <AnimatedSection className="w-full max-w-lg">
            <div className="bg-background border border-foreground/20 rounded-sm overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                <h3 className="text-xl font-bold text-foreground capitalize">
                  {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={handleCloseModal} className="p-2 text-foreground/50 hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="admin-form" onSubmit={handleSave} className="flex flex-col gap-5">
                  
                  {activeTab === "products" && (
                    <>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Product Name</label><input type="text" name="name" value={formData.name || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                      <div className="grid grid-cols-2 gap-5"><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Category</label><select name="category" value={formData.category || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-background border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors appearance-none">{categories.filter(c => c !== "All").map(c => (<option key={c} value={c}>{c}</option>))}</select></div><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Price</label><input type="text" name="price" value={formData.price || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div></div>
                      <div className="grid grid-cols-2 gap-5"><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Dimensions</label><input type="text" name="dimensions" value={formData.dimensions || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Material</label><input type="text" name="material" value={formData.material || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div></div>
                      <div className="grid grid-cols-2 gap-5"><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">MOQ</label><input type="text" name="moq" value={formData.moq || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div><div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Certification</label><input type="text" name="certification" value={formData.certification || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div></div>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Buy URL</label><input type="url" name="buyUrl" value={formData.buyUrl || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                    </>
                  )}

                  {activeTab === "links" && (
                    <>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Link Title</label><input type="text" name="title" value={formData.title || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">URL</label><input type="url" name="url" value={formData.url || ""} onChange={handleChange} required className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                    </>
                  )}

                  {activeTab === "standards" && (
                    <>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Standard Code</label><input type="text" name="code" value={formData.code || ""} onChange={handleChange} required placeholder="e.g. EN 13432" className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Description</label><textarea name="description" value={formData.description || ""} onChange={handleChange} required rows={4} className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors resize-none" /></div>
                    </>
                  )}

                  {activeTab === "credentials" && (
                    <>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Credential Title</label><input type="text" name="title" value={formData.title || ""} onChange={handleChange} required placeholder="e.g. ISO 9001:2015" className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors" /></div>
                      <div className="flex flex-col gap-2"><label className="text-sm text-foreground/70">Description</label><textarea name="description" value={formData.description || ""} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/10 rounded-sm text-foreground text-sm focus:border-green transition-colors resize-none" /></div>
                    </>
                  )}

                </form>
              </div>

              <div className="p-6 border-t border-foreground/10 bg-foreground/5 flex items-center justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Cancel</button>
                <button type="submit" form="admin-form" className="flex items-center gap-2 px-6 py-2.5 bg-green text-black text-sm font-bold rounded-sm transition-transform hover:scale-105">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
}

function ActionButtons({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button onClick={() => onEdit(item)} className="p-2 text-foreground/50 hover:text-green transition-colors"><Edit2 className="w-4 h-4" /></button>
      <button onClick={() => onDelete(item.id)} className="p-2 text-foreground/50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
    </div>
  );
}
