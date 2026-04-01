// Check authentication immediately - redirect if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

const pages = {
    overview: {
        title: 'Dashboard Overview',
        content: `
            <div class="recent-section">
                <h2 class="section-title">Recent Applications</h2>
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Field Size</th>
                                <th>Crop Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="recentApplicationsBody">
                            <tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No applications yet</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
    applications: {
        title: 'Client Applications',
        content: `
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statTotalApps">0</span>
                        <span class="stat-label">Total Applications</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statPending">0</span>
                        <span class="stat-label">Pending Requests</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statApproved">0</span>
                        <span class="stat-label">Approved Clients</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statDenied">0</span>
                        <span class="stat-label">Denied</span>
                    </div>
                </div>
            </div>
            <div class="page-header">
                <p>View and manage all client service applications</p>
            </div>
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Field Size</th>
                            <th>Crop Type</th>
                            <th>Date Submitted</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="applicationsTableBody">
                    </tbody>
                </table>
                <div id="noApplications" class="empty-state" style="display:none;">
                    <p>No applications submitted yet.</p>
                </div>
            </div>
            
            <div id="applicationDetailModal" class="modal">
                <div class="modal-content application-detail">
                    <div class="modal-header">
                        <h3>Application Details</h3>
                        <button class="modal-close" onclick="closeApplicationModal()">&times;</button>
                    </div>
                    <div class="modal-body" id="applicationDetailContent">
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" onclick="updateApplicationStatus('approved')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                            Approve
                        </button>
                        <button class="btn btn-danger" onclick="updateApplicationStatus('denied')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    requests: {
        title: 'Service Requests',
        content: `
            <div class="page-header">
                <p>Track and manage service requests</p>
            </div>
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Client</th>
                            <th>Service Type</th>
                            <th>Date Requested</th>
                            <th>Scheduled Date</th>
                            <th>Acres</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>REQ-001</td>
                            <td>Mike Johnson</td>
                            <td>Precision Spraying</td>
                            <td>2026-03-15</td>
                            <td>2026-04-01</td>
                            <td>320</td>
                            <td><span class="status scheduled">Scheduled</span></td>
                        </tr>
                        <tr>
                            <td>REQ-002</td>
                            <td>Tom Wilson</td>
                            <td>Variable Rate</td>
                            <td>2026-03-20</td>
                            <td>2026-04-05</td>
                            <td>200</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>REQ-003</td>
                            <td>Sarah Davis</td>
                            <td>Precision Spraying</td>
                            <td>2026-03-10</td>
                            <td>2026-03-28</td>
                            <td>750</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>REQ-004</td>
                            <td>John Smith</td>
                            <td>Full Service</td>
                            <td>2026-03-25</td>
                            <td>TBD</td>
                            <td>500</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },
    profiles: {
        title: 'Farm Profiles',
        content: `
            <div class="page-header">
                <p>Manage client farm profiles and field data</p>
            </div>
            <div class="profiles-grid">
                <div class="profile-card">
                    <div class="profile-header">
                        <h3>John Smith Farm</h3>
                        <span class="status approved">Active</span>
                    </div>
                    <div class="profile-details">
                        <div class="detail-row">
                            <span class="label">Location:</span>
                            <span>Freeport, IL</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Total Acres:</span>
                            <span>500</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Primary Crop:</span>
                            <span>Corn</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Terrain:</span>
                            <span>Flat</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Last Service:</span>
                            <span>2026-03-15</span>
                        </div>
                    </div>
                </div>
                <div class="profile-card">
                    <div class="profile-header">
                        <h3>Mike Johnson Farm</h3>
                        <span class="status approved">Active</span>
                    </div>
                    <div class="profile-details">
                        <div class="detail-row">
                            <span class="label">Location:</span>
                            <span>Rockford, IL</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Total Acres:</span>
                            <span>320</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Primary Crop:</span>
                            <span>Soybeans</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Terrain:</span>
                            <span>Hilly</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Last Service:</span>
                            <span>2026-03-20</span>
                        </div>
                    </div>
                </div>
                <div class="profile-card">
                    <div class="profile-header">
                        <h3>Sarah Davis Farm</h3>
                        <span class="status pending">Inactive</span>
                    </div>
                    <div class="profile-details">
                        <div class="detail-row">
                            <span class="label">Location:</span>
                            <span>DeKalb, IL</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Total Acres:</span>
                            <span>750</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Primary Crop:</span>
                            <span>Corn</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Terrain:</span>
                            <span>Flat</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Last Service:</span>
                            <span>2025-10-15</span>
                        </div>
                    </div>
                </div>
                <div class="profile-card">
                    <div class="profile-header">
                        <h3>Tom Wilson Farm</h3>
                        <span class="status approved">Active</span>
                    </div>
                    <div class="profile-details">
                        <div class="detail-row">
                            <span class="label">Location:</span>
                            <span>Belvidere, IL</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Total Acres:</span>
                            <span>200</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Primary Crop:</span>
                            <span>Wheat</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Terrain:</span>
                            <span>Hilly</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Last Service:</span>
                            <span>2026-03-01</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    reports: {
        title: 'Reports',
        content: `
            <div class="page-header">
                <p>View analytics and reports</p>
            </div>
            <div class="reports-grid">
                <div class="report-card">
                    <div class="report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                    </div>
                    <h3>Monthly Revenue</h3>
                    <p class="report-value">$45,250</p>
                    <span class="report-change positive">+12% from last month</span>
                </div>
                <div class="report-card">
                    <div class="report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m6.8 14-3.5 2"/><path d="m20.7 16-3.5-2"/><path d="M6.8 10 3.3 8"/><path d="m20.7 8-3.5 2"/></svg>
                    </div>
                    <h3>Acres Sprayed</h3>
                    <p class="report-value">2,450</p>
                    <span class="report-change positive">+8% from last month</span>
                </div>
                <div class="report-card">
                    <div class="report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3>Client Satisfaction</h3>
                    <p class="report-value">94%</p>
                    <span class="report-change positive">+2% from last month</span>
                </div>
                <div class="report-card">
                    <div class="report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3>Avg Response Time</h3>
                    <p class="report-value">4.2 hrs</p>
                    <span class="report-change negative">-15% slower</span>
                </div>
            </div>
            <div class="chart-placeholder">
                <h3>Service History - Last 6 Months</h3>
                <div class="chart-visual">
                    <div class="chart-bar" style="height: 60%;"><span>Oct</span></div>
                    <div class="chart-bar" style="height: 75%;"><span>Nov</span></div>
                    <div class="chart-bar" style="height: 45%;"><span>Dec</span></div>
                    <div class="chart-bar" style="height: 55%;"><span>Jan</span></div>
                    <div class="chart-bar" style="height: 85%;"><span>Feb</span></div>
                    <div class="chart-bar" style="height: 90%;"><span>Mar</span></div>
                </div>
            </div>
        `
    },
    account: {
        title: 'Account Settings',
        content: `
            <div class="page-header">
                <p>Manage your account settings</p>
            </div>
            <div class="settings-section">
                <h3>Profile Information</h3>
                <div class="settings-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" value="Admin" disabled>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input type="text" value="Administrator" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" value="grotechagridrones@gmail.com">
                    </div>
                    <button class="btn btn-primary">Save Changes</button>
                </div>
            </div>
            <div class="settings-section">
                <h3>Change Password</h3>
                <div class="settings-form">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" placeholder="Enter current password">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="Enter new password">
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm new password">
                        </div>
                    </div>
                    <button class="btn btn-primary">Update Password</button>
                </div>
            </div>
        `
    },
    documents: {
        title: 'Documents',
        content: `
            <div class="page-header">
                <p>Upload and manage company documents</p>
            </div>
            <div class="documents-section">
                <div class="upload-area" id="uploadArea">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span class="upload-text">Drop files here or</span>
                    <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" style="display:none">
                    <button class="btn btn-primary btn-sm" onclick="document.getElementById('fileInput').click()">Browse</button>
                </div>
                
                <div class="documents-filter">
                    <div class="filter-group">
                        <label>Category:</label>
                        <select id="categoryFilter" onchange="filterDocuments()">
                            <option value="all">All Documents</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="searchInput" placeholder="Search documents..." onkeyup="filterDocuments()">
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="toggleCategoryManager()">Manage Categories</button>
                </div>
                
                <div class="category-manager" id="categoryManager" style="display:none;">
                    <div class="category-manager-header">
                        <h4>Categories</h4>
                        <div class="add-category">
                            <input type="text" id="newCategoryInput" placeholder="New category name...">
                            <button class="btn btn-primary btn-sm" onclick="addCategory()">Add</button>
                        </div>
                    </div>
                    <div class="category-list" id="categoryList"></div>
                </div>

                <div class="documents-grid" id="documentsGrid">
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <h3>No documents yet</h3>
                        <p>Upload your first document to get started</p>
                    </div>
                </div>
            </div>

            <style>
                .documents-section { max-width: 1200px; }
                .upload-area {
                    background: var(--bg-card);
                    border: 2px dashed var(--border-light);
                    border-radius: 8px;
                    padding: 12px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                }
                .upload-area:hover { border-color: var(--primary-light); background: rgba(54, 124, 43, 0.05); }
                .upload-area svg { color: var(--text-muted); flex-shrink: 0; }
                .upload-text { color: var(--text-secondary); font-size: 0.9rem; }
                .upload-area.dragover { border-color: var(--primary-light); background: rgba(54, 124, 43, 0.1); }
                .btn-sm { padding: 6px 14px; font-size: 0.85rem; }
                
                .documents-filter {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }
                .filter-group { display: flex; align-items: center; gap: 8px; }
                .filter-group label { color: var(--text-secondary); font-size: 0.9rem; }
                .filter-group select, .filter-group input {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    color: var(--text-primary);
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                }
                .filter-group input { width: 200px; }
                
                .category-manager {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 20px;
                }
                .category-manager-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .category-manager-header h4 { margin: 0; color: var(--text-primary); }
                .add-category { display: flex; gap: 8px; }
                .add-category input {
                    background: var(--bg-dark);
                    border: 1px solid var(--border-light);
                    color: var(--text-primary);
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    width: 180px;
                }
                .category-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .category-chip {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(54, 124, 43, 0.15);
                    color: var(--primary-light);
                    padding: 4px 10px;
                    border-radius: 16px;
                    font-size: 0.8rem;
                }
                .category-chip button {
                    background: none;
                    border: none;
                    color: var(--primary-light);
                    cursor: pointer;
                    padding: 0;
                    font-size: 1rem;
                    line-height: 1;
                    opacity: 0.7;
                }
                .category-chip button:hover { opacity: 1; }
                
                .documents-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 16px;
                }
                .document-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s ease;
                }
                .document-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
                .document-card-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                .document-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(54, 124, 43, 0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .document-icon svg { color: var(--primary-light); }
                .document-info { flex: 1; min-width: 0; }
                .document-name {
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .document-meta { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px; }
                .doc-category-select {
                    background: var(--bg-dark);
                    border: 1px solid var(--border-light);
                    color: var(--primary-light);
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    text-transform: capitalize;
                    cursor: pointer;
                    width: 100%;
                }
                .doc-category-select:focus { outline: none; border-color: var(--primary-light); }
                .document-actions {
                    display: flex;
                    gap: 8px;
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid var(--border-light);
                }
                .doc-btn {
                    flex: 1;
                    padding: 8px;
                    background: transparent;
                    border: 1px solid var(--border-light);
                    border-radius: 6px;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.2s ease;
                }
                .doc-btn:hover { background: var(--bg-card-hover); color: var(--text-primary); }
                .doc-btn.delete:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: #ef4444; }
                
                .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }
                .empty-state svg { opacity: 0.3; margin-bottom: 16px; }
                .empty-state h3 { color: var(--text-secondary); margin-bottom: 8px; }
                
                .upload-progress {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-bottom: 16px;
                    display: none;
                }
                .upload-progress.active { display: block; }
                .progress-bar {
                    height: 4px;
                    background: var(--border-light);
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 8px;
                }
                .progress-fill {
                    height: 100%;
                    background: var(--primary-light);
                    width: 0%;
                    transition: width 0.3s ease;
                }
            </style>
        `
    }
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const pageKey = this.getAttribute('data-page');
        const page = pages[pageKey];
        
        document.getElementById('pageTitle').textContent = page.title;
        document.getElementById('contentArea').innerHTML = page.content;
    });
});

document.getElementById('contentArea').innerHTML = pages.overview.content;

// Logout button handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        window.location.href = 'login.html';
    });
}

function updateDashboardStats() {
    const apps = JSON.parse(sessionStorage.getItem('applications') || '[]');
    const totalEl = document.getElementById('statTotalApps');
    const pendingEl = document.getElementById('statPending');
    const approvedEl = document.getElementById('statApproved');
    const deniedEl = document.getElementById('statDenied');
    const recentBody = document.getElementById('recentApplicationsBody');
    
    if (totalEl) totalEl.textContent = apps.length;
    if (pendingEl) pendingEl.textContent = apps.filter(a => a.status === 'pending').length;
    if (approvedEl) approvedEl.textContent = apps.filter(a => a.status === 'approved').length;
    if (deniedEl) deniedEl.textContent = apps.filter(a => a.status === 'denied').length;
    
    if (recentBody) {
        if (apps.length === 0) {
            recentBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No applications yet</td></tr>';
        } else {
            const recent = apps.slice(0, 5);
            recentBody.innerHTML = recent.map(app => {
                const cropTypes = app.fields.map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
                const totalAcres = app.fields.reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0);
                const statusClass = app.status === 'approved' ? 'approved' : app.status === 'denied' ? 'denied' : 'pending';
                return `
                    <tr>
                        <td>${app.id}</td>
                        <td>${app.fullName}</td>
                        <td>${totalAcres} acres</td>
                        <td>${cropTypes}</td>
                        <td><span class="status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Applications Management System
let applications = JSON.parse(sessionStorage.getItem('applications') || '[]');
let currentApplicationId = null;

function saveApplications() {
    sessionStorage.setItem('applications', JSON.stringify(applications));
}

function generateApplicationId() {
    let maxId = 0;
    applications.forEach(app => {
        const id = parseInt(app.id.replace('APP-', ''));
        if (id > maxId) maxId = id;
    });
    return 'APP-' + String(maxId + 1).padStart(3, '0');
}

function submitApplication(formData) {
    const application = {
        id: generateApplicationId(),
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        billingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        contactMethod: formData.contactMethod,
        fields: formData.fields || [],
        message: formData.message || '',
        status: 'pending',
        dateSubmitted: new Date().toISOString()
    };
    applications.unshift(application);
    saveApplications();
    renderApplicationsTable();
}

function renderApplicationsTable() {
    const tbody = document.getElementById('applicationsTableBody');
    const noApps = document.getElementById('noApplications');
    
    if (!tbody) return;
    
    if (applications.length === 0) {
        tbody.innerHTML = '';
        if (noApps) noApps.style.display = 'block';
        return;
    }
    
    if (noApps) noApps.style.display = 'none';
    
    tbody.innerHTML = applications.map(app => {
        const date = new Date(app.dateSubmitted).toLocaleDateString();
        const statusClass = app.status === 'approved' ? 'approved' : app.status === 'denied' ? 'denied' : 'pending';
        const cropTypes = app.fields.map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
        const totalAcres = app.fields.reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0);
        
        return `
            <tr>
                <td>${app.id}</td>
                <td>${app.fullName}</td>
                <td>${app.phone}</td>
                <td>${totalAcres} acres</td>
                <td>${cropTypes}</td>
                <td>${date}</td>
                <td><span class="status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
                <td><button class="action-btn" onclick="viewApplication('${app.id}')">View</button></td>
            </tr>
        `;
    }).join('');
}

function viewApplication(id) {
    currentApplicationId = id;
    const app = applications.find(a => a.id === id);
    if (!app) return;
    
    const date = new Date(app.dateSubmitted).toLocaleString();
    const statusClass = app.status === 'approved' ? 'approved' : app.status === 'denied' ? 'denied' : 'pending';
    
    let fieldsHtml = app.fields.map((field, index) => `
        <div class="detail-field-group">
            <h4>Field ${index + 1}${field.fieldName ? ': ' + field.fieldName : ''}</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Field Size</label>
                    <span>${field.fieldSize || 'N/A'} acres</span>
                </div>
                <div class="detail-item">
                    <label>Crop Type</label>
                    <span>${field.cropType || 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <label>GPS Coordinates</label>
                    <span>${field.fieldLocation || 'Not provided'}</span>
                </div>
                <div class="detail-item">
                    <label>Chemicals</label>
                    <span>${field.chemicals && field.chemicals.length > 0 ? field.chemicals.join(', ') : 'Not specified'}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    const content = `
        <div class="application-detail-header">
            <div class="detail-id">${app.id}</div>
            <span class="status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
        </div>
        
        <div class="detail-section">
            <h4>Contact Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Full Name</label>
                    <span>${app.fullName}</span>
                </div>
                <div class="detail-item">
                    <label>Phone</label>
                    <span>${app.phone}</span>
                </div>
                <div class="detail-item">
                    <label>Email</label>
                    <span>${app.email}</span>
                </div>
                <div class="detail-item">
                    <label>Preferred Contact</label>
                    <span>${app.contactMethod || 'N/A'}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>Billing Address</h4>
            <div class="detail-grid">
                <div class="detail-item full-width">
                    <label>Address</label>
                    <span>${app.billingAddress}, ${app.city}, ${app.state} ${app.zip}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>Field Information</h4>
            ${fieldsHtml}
        </div>
        
        ${app.message ? `
        <div class="detail-section">
            <h4>Additional Information</h4>
            <p class="detail-message">${app.message}</p>
        </div>
        ` : ''}
        
        <div class="detail-section">
            <h4>Submission Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Date Submitted</label>
                    <span>${date}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('applicationDetailContent').innerHTML = content;
    document.getElementById('applicationDetailModal').classList.add('active');
}

function closeApplicationModal() {
    document.getElementById('applicationDetailModal').classList.remove('active');
    currentApplicationId = null;
}

function updateApplicationStatus(status) {
    if (!currentApplicationId) return;
    
    const app = applications.find(a => a.id === currentApplicationId);
    if (app) {
        app.status = status;
        saveApplications();
        renderApplicationsTable();
        
        // Update the modal header status
        const modal = document.getElementById('applicationDetailModal');
        const statusBadge = modal.querySelector('.application-detail-header .status');
        if (statusBadge) {
            statusBadge.className = `status ${status}`;
            statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
        
        closeApplicationModal();
    }
}

// Document Management System
let documents = JSON.parse(sessionStorage.getItem('documents') || '[]');
let categories = JSON.parse(sessionStorage.getItem('documentCategories') || '["contracts", "reports", "invoices", "policies", "other"]');

function saveDocuments() {
    sessionStorage.setItem('documents', JSON.stringify(documents));
}

function saveCategories() {
    sessionStorage.setItem('documentCategories', JSON.stringify(categories));
}

function getCategoryOptions(selected = null) {
    return categories.map(cat => 
        `<option value="${cat}" ${cat === selected ? 'selected' : ''}>${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`
    ).join('');
}

function updateCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    if (filter) {
        filter.innerHTML = '<option value="all">All Documents</option>' + 
            categories.map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('');
    }
}

function updateCategoryList() {
    const list = document.getElementById('categoryList');
    if (list) {
        list.innerHTML = categories.map(cat => `
            <div class="category-chip">
                <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                <button onclick="removeCategory('${cat}')" title="Remove category">&times;</button>
            </div>
        `).join('');
    }
}

function toggleCategoryManager() {
    const manager = document.getElementById('categoryManager');
    if (manager) {
        const isHidden = manager.style.display === 'none';
        manager.style.display = isHidden ? 'block' : 'none';
        if (isHidden) updateCategoryList();
    }
}

function addCategory() {
    const input = document.getElementById('newCategoryInput');
    if (input) {
        const newCat = input.value.trim().toLowerCase();
        if (newCat && !categories.includes(newCat)) {
            categories.push(newCat);
            saveCategories();
            updateCategoryList();
            updateCategoryFilter();
            input.value = '';
        }
    }
}

function removeCategory(cat) {
    if (categories.length <= 1) {
        alert('You must have at least one category.');
        return;
    }
    if (confirm(`Remove "${cat}" category? Documents in this category will be moved to "${categories[0]}".`)) {
        // Move documents to first category
        documents.forEach(doc => {
            if (doc.category === cat) {
                doc.category = categories[0];
            }
        });
        saveDocuments();
        
        categories = categories.filter(c => c !== cat);
        saveCategories();
        updateCategoryList();
        updateCategoryFilter();
        renderDocuments();
    }
}

function changeDocumentCategory(docId, newCategory) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        doc.category = newCategory;
        saveDocuments();
    }
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
    if (type.includes('word') || type.includes('doc')) return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
    if (type.includes('sheet') || type.includes('excel') || type.includes('xls')) return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>';
    if (type.includes('image')) return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderDocuments() {
    const grid = document.getElementById('documentsGrid');
    if (!grid) return;
    
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filtered = documents.filter(doc => {
        const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <h3>${documents.length === 0 ? 'No documents yet' : 'No documents match your filter'}</h3>
                <p>${documents.length === 0 ? 'Upload your first document to get started' : 'Try adjusting your search or category filter'}</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(doc => `
        <div class="document-card" data-id="${doc.id}">
            <div class="document-card-header">
                <div class="document-icon">${getFileIcon(doc.type)}</div>
                <div class="document-info">
                    <div class="document-name" title="${doc.name}">${doc.name}</div>
                    <div class="document-meta">${formatFileSize(doc.size)} • ${formatDate(doc.date)}</div>
                    <select class="doc-category-select" onchange="changeDocumentCategory('${doc.id}', this.value)">
                        ${getCategoryOptions(doc.category)}
                    </select>
                </div>
            </div>
            <div class="document-actions">
                <button class="doc-btn view" onclick="viewDocument('${doc.id}')">View</button>
                <button class="doc-btn download" onclick="downloadDocument('${doc.id}')">Download</button>
                <button class="doc-btn delete" onclick="deleteDocument('${doc.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function filterDocuments() {
    renderDocuments();
}

function viewDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (doc && doc.dataUrl) {
        const newWindow = window.open();
        if (doc.type.includes('image')) {
            newWindow.document.write(`<html><head><title>${doc.name}</title></head><body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;"><img src="${doc.dataUrl}" style="max-width:100%;max-height:100vh;"></body></html>`);
        } else {
            newWindow.document.write(`<html><head><title>${doc.name}</title></head><body style="margin:0;"><iframe src="${doc.dataUrl}" style="width:100%;height:100vh;border:none;"></iframe></body></html>`);
        }
    }
}

function downloadDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (doc && doc.dataUrl) {
        const a = document.createElement('a');
        a.href = doc.dataUrl;
        a.download = doc.name;
        a.click();
    }
}

function deleteDocument(id) {
    if (confirm('Are you sure you want to delete this document?')) {
        documents = documents.filter(d => d.id !== id);
        saveDocuments();
        renderDocuments();
    }
}

function handleFileUpload(files) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const doc = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                category: getCategoryFromType(file.type),
                date: new Date().toISOString(),
                dataUrl: e.target.result
            };
            documents.unshift(doc);
            saveDocuments();
            renderDocuments();
        };
        reader.readAsDataURL(file);
    });
}

function getCategoryFromType(type) {
    if (type.includes('pdf') || type.includes('word') || type.includes('doc')) return 'contracts';
    if (type.includes('sheet') || type.includes('excel') || type.includes('xls')) return 'reports';
    if (type.includes('image')) return 'other';
    return 'other';
}

// Initialize document event listeners
let uploadInitialized = false;

function initUploadHandlers() {
    if (uploadInitialized) return;
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            handleFileUpload(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', function() {
            handleFileUpload(this.files);
        });
        
        uploadInitialized = true;
    }
}

// Re-render documents when navigating to documents page
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const pageKey = this.getAttribute('data-page');
        if (pageKey === 'documents') {
            uploadInitialized = false;
            setTimeout(function() {
                updateCategoryFilter();
                renderDocuments();
                initUploadHandlers();
            }, 50);
        }
        if (pageKey === 'applications') {
            setTimeout(function() {
                renderApplicationsTable();
            }, 50);
        }
        if (pageKey === 'overview') {
            setTimeout(function() {
                updateDashboardStats();
            }, 50);
        }
    });
});

// Initial render if on documents or applications page
if (document.getElementById('documentsGrid')) {
    updateCategoryFilter();
    renderDocuments();
    initUploadHandlers();
}
if (document.getElementById('applicationsTableBody')) {
    renderApplicationsTable();
}
if (document.getElementById('statTotalApps')) {
    updateDashboardStats();
}