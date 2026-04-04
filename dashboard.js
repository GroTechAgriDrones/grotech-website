// Check authentication immediately - redirect if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

const pages = {
    overview: {
        title: 'Dashboard Overview',
        content: `
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="overviewTotalJobs">0</span>
                        <span class="stat-label">Total Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="overviewPendingJobs">0</span>
                        <span class="stat-label">Pending Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="overviewScheduledJobs">0</span>
                        <span class="stat-label">Scheduled Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="overviewCompletedJobs">0</span>
                        <span class="stat-label">Completed Jobs</span>
                    </div>
                </div>
            </div>
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
        title: 'Application Requests',
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
                        <span class="stat-label">Approved Requests</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statDenied">0</span>
                        <span class="stat-label">Denied Requests</span>
                    </div>
                </div>
            </div>
            <div class="page-header">
                <p>View and manage all application requests</p>
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
            

        `
    },
    requests: {
        title: 'Jobs',
        content: `
            <div class="stats-grid" style="margin-bottom: 24px;">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statTotalJobs">0</span>
                        <span class="stat-label">Total Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statPendingJobs">0</span>
                        <span class="stat-label">Pending Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statScheduledJobs">0</span>
                        <span class="stat-label">Scheduled Jobs</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value" id="statCompletedJobs">0</span>
                        <span class="stat-label">Completed Jobs</span>
                    </div>
                </div>
            </div>
            <div class="page-header">
                <p>Track and manage jobs from approved applications</p>
            </div>
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Client</th>
                            <th>Phone</th>
                            <th>Acres</th>
                            <th>Crops</th>
                            <th>Date Requested</th>
                            <th>Schedule Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="jobsTableBody">
                        <tr>
                            <td colspan="9" class="no-data">No jobs yet. Jobs are created when applications are approved.</td>
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
                            <label>Name</label>
                            <input type="text" id="accountName" value="Admin" disabled>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input type="text" id="accountRole" value="Administrator" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="accountEmail" value="grotechagridrones@gmail.com" disabled>
                    </div>
                    <p class="text-muted" style="font-size: 0.85rem; margin-top: 8px;">Last password change: <span id="lastPasswordChange">-</span></p>
                </div>
            </div>
            <div class="settings-section">
                <h3>Change Password</h3>
                <div class="settings-form">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" id="currentPassword" placeholder="Enter current password">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" id="newPassword" placeholder="Enter new password">
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm new password">
                        </div>
                    </div>
                    <div id="passwordMessage" class="password-message"></div>
                    <button class="btn btn-primary" onclick="updatePassword()">Update Password</button>
                </div>
            </div>
            
            <style>
                .password-message {
                    padding: 10px 14px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                    display: none;
                    font-size: 0.9rem;
                }
                .password-message.success {
                    display: block;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: #22c55e;
                }
                .password-message.error {
                    display: block;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #ef4444;
                }
            </style>
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
    },
    calculator: {
        title: 'Chemical Calculator',
        content: `
            <div class="page-header">
                <p>Calculate chemical mix rates for drone spraying</p>
            </div>
            <div class="calculator-container">
                <!-- Field Calculator -->
                <div class="calculator-card">
                    <h3>Field Calculator</h3>
                    <div class="calc-form">
                        <!-- Row 1: Field Size, GPA, Total Volume -->
                        <div class="calc-row" style="grid-template-columns: repeat(3, 1fr);">
                            <div class="form-group">
                                <label>Field Size (acres)</label>
                                <input type="number" id="fieldSize" placeholder="e.g., 100" min="0" step="0.1" oninput="calculateFieldVolume()">
                            </div>
                            <div class="form-group">
                                <label>GPA (Gallons Per Acre)</label>
                                <input type="number" id="fieldGPA" placeholder="e.g., 2" min="0" step="0.5" value="2" oninput="calculateFieldVolume()">
                            </div>
                            <div class="form-group">
                                <label>Total Volume (gallons)</label>
                                <input type="number" id="totalVolume" readonly placeholder="Auto-calculated" style="background: var(--border-light);">
                            </div>
                        </div>
                        
                        <!-- Chemicals Table -->
                        <div class="field-chemicals-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Chemical Name</th>
                                        <th>Label Rate</th>
                                        <th>Rate Unit</th>
                                        <th>Volume (gal)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="fieldChemicalsBody">
                                    <tr class="chemical-row" data-row="1">
                                        <td>
                                            <select class="chemical-name" onchange="onChemicalSelect(this)">
                                                <option value="">Select chemical...</option>
                                                <option value="loading">Loading chemicals...</option>
                                            </select>
                                            <input type="text" class="custom-chem-name" placeholder="Custom name" style="display:none; margin-top: 4px;">
                                        </td>
<td><input type="text" class="label-rate" placeholder="32 or 16 - 64" oninput="calculateChemicalVolume(this)"></td>
                                        <td>
                                            <select class="rate-unit" onchange="calculateChemicalVolume(this)">
                                                <option value="oz">oz/acre</option>
                                                <option value="fl oz">fl oz/acre</option>
                                                <option value="pt">pt/acre</option>
                                                <option value="qt">qt/acre</option>
                                                <option value="gal">gal/acre</option>
                                                <option value="lb">lb/acre</option>
                                            </select>
                                        </td>
<td><input type="text" class="chemical-volume" readonly placeholder="-" style="background: var(--border-light);"></td>
                                        <td><button class="remove-chem-btn" onclick="removeChemicalRow(this)" title="Remove">&times;</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Add Chemical Button -->
                        <button class="btn btn-secondary" onclick="addChemicalRow()" style="align-self: flex-start;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Add Chemical
                        </button>
                    </div>
                </div>
                
                <!-- Tank Calculator -->
                <div class="calculator-card">
                    <h3>Tank Calculator</h3>
                    <div class="calc-form">
                        <!-- Tank Size Input -->
                        <div class="calc-row" style="grid-template-columns: repeat(2, 1fr);">
                            <div class="form-group">
                                <label>Tank Size (gallons)</label>
                                <input type="number" id="tankSize" placeholder="e.g., 100" min="0" step="0.5" value="100" oninput="calculateTankMix()">
                            </div>
                            <div class="form-group">
                                <label>Tanks Needed</label>
                                <input type="number" id="tanksNeeded" readonly placeholder="Auto-calculated" style="background: var(--border-light);">
                            </div>
                        </div>
                        
                        <!-- Tank Chemicals Table -->
                        <div class="tank-chemicals-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Chemical Name</th>
                                        <th>Label Rate</th>
                                        <th>Rate Unit</th>
                                        <th>Amount Per Tank</th>
                                    </tr>
                                </thead>
                                <tbody id="tankChemicalsBody">
                                    <tr>
                                        <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 20px;">Add chemicals in Field Calculator above</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- Results Card -->
                <div class="calculator-card results-card" id="calcResults" style="display:none;">
                    <h3>Results Summary</h3>
                    <div class="results-grid">
                        <div class="result-item">
                            <span class="result-label">Total Field Volume</span>
                            <span class="result-value" id="resultFieldVolume">-</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Total Tanks Needed</span>
                            <span class="result-value" id="resultTanksNeeded">-</span>
                        </div>
                    </div>
                    <div class="result-note">
                        <p>Always verify rates with product label. Follow all safety guidelines and local regulations.</p>
                    </div>
                </div>
            </div>
            
            <style>
                .calculator-container {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    max-width: 1000px;
                }
                .calculator-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 24px;
                }
                .calculator-card h3 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 20px;
                }
                .calc-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .calc-row {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-bottom: 16px;
                }
                @media (max-width: 900px) {
                    .calc-row {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 480px) {
                    .calc-row {
                        grid-template-columns: 1fr;
                    }
                }
                .calc-form .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .calc-form label {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                }
                .calc-form input,
                .calc-form select {
                    padding: 12px 14px;
                    background: var(--bg-dark);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                }
                .calc-form input:focus,
                .calc-form select:focus {
                    outline: none;
                    border-color: var(--primary);
                }
                .field-chemicals-table,
                .tank-chemicals-table {
                    overflow-x: auto;
                    margin: 8px 0;
                }
                .field-chemicals-table table,
                .tank-chemicals-table table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .field-chemicals-table th,
                .field-chemicals-table td,
                .tank-chemicals-table th,
                .tank-chemicals-table td {
                    padding: 10px 12px;
                    text-align: left;
                    border-bottom: 1px solid var(--border-light);
                }
                .field-chemicals-table th,
                .tank-chemicals-table th {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    background: rgba(0, 0, 0, 0.2);
                }
                .field-chemicals-table td,
                .tank-chemicals-table td {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }
                .field-chemicals-table input,
                .field-chemicals-table select {
                    padding: 8px 10px;
                    background: var(--bg-dark);
                    border: 1px solid var(--border-light);
                    border-radius: 6px;
                    color: var(--text-primary);
                    font-size: 0.85rem;
                    width: 100%;
                }
                .field-chemicals-table input:focus,
                .field-chemicals-table select:focus {
                    outline: none;
                    border-color: var(--primary);
                }
                .field-chemicals-table input[readonly] {
                    background: var(--border-light);
                    cursor: default;
                }
                .remove-chem-btn {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #ef4444;
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    line-height: 1;
                }
                .remove-chem-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                }
                .results-card {
                    border-color: var(--primary);
                    background: rgba(54, 124, 43, 0.05);
                }
                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 16px;
                }
                @media (max-width: 480px) {
                    .results-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .result-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 16px;
                    background: var(--bg-card);
                    border-radius: 10px;
                    border: 1px solid var(--border-light);
                }
                .result-label {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .result-value {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--primary-light);
                }
                .result-note {
                    padding: 12px 16px;
                    background: rgba(251, 191, 36, 0.1);
                    border: 1px solid rgba(251, 191, 36, 0.2);
                    border-radius: 8px;
                    font-size: 0.8rem;
                    color: #fbbf24;
                }
                .btn-secondary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    background: rgba(54, 124, 43, 0.1);
                    border: 1px solid var(--border);
                    color: var(--primary-light);
                    font-size: 0.9rem;
                    font-weight: 500;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-secondary:hover {
                    background: rgba(54, 124, 43, 0.2);
                }
            </style>
        `
    },
    chemicallist: {
        title: 'Chemical Information Management System',
        content: `
            <div class="page-header">
                <input type="text" id="chemicalSearchInput" class="chemical-search" placeholder="Search brand or chemical name..." oninput="filterChemicals()">
                <button class="status scheduled" onclick="openColumnManagerModal()">Manage Columns</button>
            </div>
            <div class="chemical-list-container">
                <div class="chemical-table-wrapper">
                    <table class="chemical-manager-table">
                        <thead id="chemicalManagerTableHead"></thead>
                        <tbody id="chemicalManagerTableBody"></tbody>
                    </table>
                </div>
                <div class="chemical-list-actions">
                    <button class="btn btn-secondary btn-sm" onclick="addChemicalManagerRow()">+ Add Chemical</button>
                    <button class="btn btn-primary" onclick="saveChemicals()">Save Changes</button>
                </div>
            </div>
        `
    },
    spraysettings: {
        title: 'Spray/Spread Settings',
        content: `
            <div class="page-header">
                <p>Reference spray and spread settings for DJI agricultural drones</p>
            </div>
            <div id="spraySettingsContent">
                <!-- Initial drone selection -->
                <div id="droneSelection">
                    <div class="drone-cards-container">
                        <div class="drone-card" onclick="selectDrone('t100')">
                            <div class="drone-brand">DJI</div>
                            <div class="drone-model">T100</div>
                            <div class="drone-desc">Heavy-duty spraying for large operations</div>
                        </div>
                        <div class="drone-card" onclick="selectDrone('t50')">
                            <div class="drone-brand">DJI</div>
                            <div class="drone-model">T50</div>
                            <div class="drone-desc">Versatile spraying for medium fields</div>
                        </div>
                    </div>
                </div>
                
                <!-- Category selection (hidden initially) -->
                <div id="categorySelection" style="display:none;">
                    <button class="back-btn" onclick="showDroneSelection()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        Back to Drones
                    </button>
                    <div id="selectedDroneTitle" class="selected-drone-title"></div>
                    <div class="category-cards-container">
                        <div class="category-card" onclick="showSettings('fungicide')">
                            <div class="category-icon">🍄</div>
                            <div class="category-name">Fungicide</div>
                        </div>
                        <div class="category-card" onclick="showSettings('herbicide')">
                            <div class="category-icon">🌿</div>
                            <div class="category-name">Herbicide</div>
                        </div>
                        <div class="category-card" onclick="showSettings('insecticide')">
                            <div class="category-icon">🐛</div>
                            <div class="category-name">Insecticide</div>
                        </div>
                        <div class="category-card" onclick="showSettings('fertilizer')">
                            <div class="category-icon">🌱</div>
                            <div class="category-name">Fertilizer</div>
                        </div>
                        <div class="category-card" onclick="showSettings('seeds')">
                            <div class="category-icon">🌾</div>
                            <div class="category-name">Seeds</div>
                        </div>
                    </div>
                </div>
                
                <!-- Settings display (hidden initially) -->
                <div id="settingsDisplay" style="display:none;">
                    <button class="back-btn" onclick="showCategorySelection()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        Back to Categories
                    </button>
                    <div id="settingsTitle" class="settings-title"></div>
                    <div class="settings-grid" id="settingsGrid">
                    </div>
                </div>
            </div>
            
            <style>
                .drone-cards-container {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    flex-wrap: wrap;
                    margin-top: 24px;
                }
                .drone-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 40px 60px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    min-width: 200px;
                }
                .drone-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: var(--gradient);
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }
                .drone-card:hover {
                    transform: translateY(-8px);
                    background: var(--bg-card-hover);
                    border-color: var(--border);
                    box-shadow: var(--shadow-lg);
                }
                .drone-card:hover::before {
                    transform: scaleX(1);
                }
                .drone-brand {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                }
                .drone-model {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 3rem;
                    font-weight: 700;
                    color: var(--primary-light);
                    line-height: 1;
                    margin-bottom: 16px;
                }
                .drone-desc {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }
                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: rgba(54, 124, 43, 0.1);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    color: var(--primary-light);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-bottom: 24px;
                }
                .back-btn:hover {
                    background: rgba(54, 124, 43, 0.2);
                }
                .selected-drone-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    text-align: center;
                    margin-bottom: 24px;
                }
                .category-cards-container {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .category-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 32px 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 150px;
                }
                .category-card:hover {
                    transform: translateY(-8px);
                    background: var(--bg-card-hover);
                    border-color: var(--border);
                    box-shadow: var(--shadow-lg);
                }
                .category-icon {
                    font-size: 2.5rem;
                    margin-bottom: 12px;
                }
                .category-name {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .settings-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    text-align: center;
                    margin-bottom: 24px;
                }
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    max-width: 700px;
                    margin: 0 auto;
                }
                @media (max-width: 600px) {
                    .settings-grid {
                        grid-template-columns: 1fr;
                    }
                    .drone-cards-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 20px;
                    }
                    .drone-card {
                        padding: 30px 40px;
                        width: 100%;
                        max-width: 280px;
                    }
                    .drone-model {
                        font-size: 2.5rem;
                    }
                    .category-cards-container {
                        flex-direction: column;
                        align-items: center;
                    }
                    .category-card {
                        width: 100%;
                        max-width: 280px;
                    }
                }
                .setting-item {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 24px;
                    text-align: center;
                }
                .setting-label {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }
                .setting-value {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--primary-light);
                }
                .setting-unit {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-left: 4px;
                }
            </style>
        `
    }
};

// Spray Settings Data
const spraySettingsData = {
    t100: {
        name: 'DJI T100',
        settings: {
            fungicide: { rate: 2, rateUnit: 'gpa', speed: 64, speedUnit: 'fps', height: 10, heightUnit: 'ft', droplet: 300, dropletUnit: 'microns' },
            herbicide: { rate: 3, rateUnit: 'gpa', speed: 72, speedUnit: 'fps', height: 12, heightUnit: 'ft', droplet: 250, dropletUnit: 'microns' },
            insecticide: { rate: 2, rateUnit: 'gpa', speed: 64, speedUnit: 'fps', height: 10, heightUnit: 'ft', droplet: 200, dropletUnit: 'microns' },
            fertilizer: { rate: 5, rateUnit: 'gpa', speed: 48, speedUnit: 'fps', height: 8, heightUnit: 'ft', droplet: 350, dropletUnit: 'microns' },
            seeds: { rate: 15, rateUnit: 'lb/acre', speed: 32, speedUnit: 'fps', height: 6, heightUnit: 'ft', droplet: 500, dropletUnit: 'microns' }
        }
    },
    t50: {
        name: 'DJI T50',
        settings: {
            fungicide: { rate: 2, rateUnit: 'gpa', speed: 32, speedUnit: 'fps', height: 10, heightUnit: 'ft', droplet: 300, dropletUnit: 'microns' },
            herbicide: { rate: 3, rateUnit: 'gpa', speed: 36, speedUnit: 'fps', height: 12, heightUnit: 'ft', droplet: 250, dropletUnit: 'microns' },
            insecticide: { rate: 2, rateUnit: 'gpa', speed: 32, speedUnit: 'fps', height: 10, heightUnit: 'ft', droplet: 200, dropletUnit: 'microns' },
            fertilizer: { rate: 5, rateUnit: 'gpa', speed: 24, speedUnit: 'fps', height: 8, heightUnit: 'ft', droplet: 350, dropletUnit: 'microns' },
            seeds: { rate: 15, rateUnit: 'lb/acre', speed: 16, speedUnit: 'fps', height: 6, heightUnit: 'ft', droplet: 500, dropletUnit: 'microns' }
        }
    }
};

let selectedDrone = null;

function selectDrone(droneId) {
    selectedDrone = droneId;
    const drone = spraySettingsData[droneId];
    
    document.getElementById('droneSelection').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    document.getElementById('settingsDisplay').style.display = 'none';
    
    document.getElementById('selectedDroneTitle').textContent = drone.name + ' Settings';
}

function showDroneSelection() {
    document.getElementById('droneSelection').style.display = 'block';
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('settingsDisplay').style.display = 'none';
    selectedDrone = null;
}

function showCategorySelection() {
    document.getElementById('droneSelection').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    document.getElementById('settingsDisplay').style.display = 'none';
}

function showSettings(category) {
    if (!selectedDrone) return;
    
    const drone = spraySettingsData[selectedDrone];
    const settings = drone.settings[category];
    const categoryNames = {
        fungicide: 'Fungicide',
        herbicide: 'Herbicide',
        insecticide: 'Insecticide',
        fertilizer: 'Fertilizer',
        seeds: 'Seeds'
    };
    
    document.getElementById('droneSelection').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('settingsDisplay').style.display = 'block';
    
    document.getElementById('settingsTitle').textContent = drone.name + ' - ' + categoryNames[category] + ' Settings';
    
    document.getElementById('settingsGrid').innerHTML = `
        <div class="setting-item">
            <div class="setting-label">Application Rate</div>
            <div class="setting-value">${settings.rate}<span class="setting-unit">${settings.rateUnit}</span></div>
        </div>
        <div class="setting-item">
            <div class="setting-label">Flight Speed</div>
            <div class="setting-value">${settings.speed}<span class="setting-unit">${settings.speedUnit}</span></div>
        </div>
        <div class="setting-item">
            <div class="setting-label">Spray Height</div>
            <div class="setting-value">${settings.height}<span class="setting-unit">${settings.heightUnit}</span></div>
        </div>
        <div class="setting-item">
            <div class="setting-label">Droplet Size</div>
            <div class="setting-value">${settings.droplet}<span class="setting-unit">${settings.dropletUnit}</span></div>
        </div>
    `;
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const pageKey = this.getAttribute('data-page');
        const page = pages[pageKey];
        
        document.getElementById('pageTitle').textContent = page.title;
        document.getElementById('contentArea').innerHTML = page.content;
        
        // Fetch chemicals when calculator page is loaded
        if (pageKey === 'calculator') {
            setTimeout(() => {
                fetchChemicalsForCalculator();
            }, 100);
        }
        
        // Fetch account info when account page is loaded
        if (pageKey === 'account') {
            setTimeout(() => {
                fetchAccountInfo();
            }, 100);
        }
        
        // Fetch jobs when jobs page is loaded
        if (pageKey === 'requests') {
            setTimeout(() => {
                fetchJobs();
            }, 100);
        }
    });
});

document.getElementById('contentArea').innerHTML = pages.overview.content;

// Logout button handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userName');
        window.location.href = 'login.html';
    });
}

// Fetch account info and populate fields
async function fetchAccountInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/credentials`);
        const creds = await response.json();
        
        const nameEl = document.getElementById('accountName');
        const emailEl = document.getElementById('accountEmail');
        const roleEl = document.getElementById('accountRole');
        const lastChangeEl = document.getElementById('lastPasswordChange');
        
        if (nameEl) nameEl.value = creds.name || 'Admin';
        if (emailEl) emailEl.value = creds.email || '';
        if (roleEl) roleEl.value = creds.role || 'Administrator';
        if (lastChangeEl && creds.lastPasswordChange) {
            lastChangeEl.textContent = new Date(creds.lastPasswordChange).toLocaleDateString();
        }
    } catch (error) {
        console.error('Error fetching account info:', error);
    }
}

// Update password function
async function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageEl = document.getElementById('passwordMessage');
    
    // Reset message
    messageEl.className = 'password-message';
    messageEl.style.display = 'none';
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        messageEl.textContent = 'Please fill in all fields';
        messageEl.className = 'password-message error';
        return;
    }
    
    if (newPassword.length < 4) {
        messageEl.textContent = 'New password must be at least 4 characters';
        messageEl.className = 'password-message error';
        return;
    }
    
    if (newPassword !== confirmPassword) {
        messageEl.textContent = 'New passwords do not match';
        messageEl.className = 'password-message error';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/credentials`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Show success popup
            alert('Password was successfully changed!');
            
            messageEl.textContent = 'Password updated successfully!';
            messageEl.className = 'password-message success';
            // Clear fields
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            // Update last password change
            if (result.lastPasswordChange) {
                document.getElementById('lastPasswordChange').textContent = 
                    new Date(result.lastPasswordChange).toLocaleDateString();
            }
        } else {
            messageEl.textContent = result.error || 'Failed to update password';
            messageEl.className = 'password-message error';
        }
    } catch (error) {
        console.error('Error updating password:', error);
        messageEl.textContent = 'Error connecting to server';
        messageEl.className = 'password-message error';
    }
}

function updateDashboardStats() {
    const apps = applications;
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
            const recent = apps.slice(0, 3);
            recentBody.innerHTML = recent.map(app => {
                const cropTypes = (app.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
                const totalAcres = (app.fields || []).reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0);
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

// ============================================
// APPLICATIONS API - Fetches from AWS Lambda
// ============================================
const API_BASE_URL = 'https://g82vp7wi5i.execute-api.us-east-2.amazonaws.com/prod';
let applications = [];
let currentApplicationId = null;

// Fetch all applications from API
async function fetchApplications() {
    try {
        const response = await fetch(`${API_BASE_URL}/applications`);
        applications = await response.json();
        renderApplicationsTable();
        updateDashboardStats();
    } catch (error) {
        console.error('Error fetching applications:', error);
        const tbody = document.getElementById('applicationsTableBody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ef4444;">Error loading applications. Check console for details.</td></tr>';
        }
    }
}

// Render applications table
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
        const cropTypes = (app.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
        const totalAcres = (app.fields || []).reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0);
        
        return `
            <tr class="clickable-row" onclick="viewApplication('${app.id}')">
                <td>${app.id}</td>
                <td>${app.fullName}</td>
                <td>${app.phone}</td>
                <td>${totalAcres} acres</td>
                <td>${cropTypes}</td>
                <td>${date}</td>
                <td><span class="status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
                <td class="actions-cell">
                    <button class="action-btn delete-btn" onclick="event.stopPropagation(); deleteApplication('${app.id}')" title="Delete application">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// View application details
function viewApplication(id) {
    currentApplicationId = id;
    const app = applications.find(a => a.id === id);
    if (!app) return;
    
    const date = new Date(app.dateSubmitted).toLocaleString();
    const statusClass = app.status === 'approved' ? 'approved' : app.status === 'denied' ? 'denied' : 'pending';
    
    let fieldsHtml = '';
    if (app.fields && app.fields.length > 0) {
        fieldsHtml = app.fields.map((field, index) => `
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
                        <span>
                            ${field.fieldLocation ? 
                                `<span>${field.fieldLocation}</span>
                                 <button class="map-view-btn" onclick="event.stopPropagation(); viewFieldMap('${field.fieldLocation}')" title="View on map">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                                 </button>` 
                                : 'Not provided'}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Chemicals</label>
                        <span>
                            ${field.chemicals && field.chemicals.length > 0 ? field.chemicals.join(', ') : 'Not specified'}
                            ${field.chemicals && field.chemicals.length > 0 && field.fieldSize ? 
                                `<button class="calc-view-btn" onclick="event.stopPropagation(); openCalculatorWithField('${field.fieldSize}', ${JSON.stringify(field.chemicals).replace(/"/g, '&quot;')})" title="Calculate in Chemical Calculator">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>
                                 </button>` 
                                : ''}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Optimal Date</label>
                        <span>${field.optimalDate || 'Not specified'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
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
                    <span>${app.address}, ${app.city}, ${app.state} ${app.zip}</span>
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
    
    // Populate modal footer with Approve/Deny buttons for applications
    const footerHtml = `
        <button class="btn btn-success" onclick="updateApplicationStatus('approved')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Approve
        </button>
        <button class="btn btn-danger" onclick="updateApplicationStatus('denied')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Deny
        </button>
    `;
    document.getElementById('modalFooter').innerHTML = footerHtml;
    document.getElementById('modalFooter').style.display = 'flex';
    
    document.getElementById('applicationDetailModal').classList.add('active');
}

function closeApplicationModal() {
    document.getElementById('applicationDetailModal').classList.remove('active');
    // Clear and hide modal footer
    document.getElementById('modalFooter').innerHTML = '';
    document.getElementById('modalFooter').style.display = 'none';
    currentApplicationId = null;
}

// Field Map variables
let fieldMap = null;
let fieldMarker = null;

// View field location on map
function viewFieldMap(coordinates) {
    if (!coordinates) {
        alert('No GPS coordinates available for this field.');
        return;
    }
    
    // Parse coordinates (format: "lat, lng")
    const coords = coordinates.split(',').map(c => parseFloat(c.trim()));
    if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
        alert('Invalid GPS coordinates format.');
        return;
    }
    
    const [lat, lng] = coords;
    
    // Show modal
    document.getElementById('fieldMapModal').classList.add('active');
    document.getElementById('fieldMapCoords').textContent = `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    
    // Initialize map (remove existing if any)
    if (fieldMap) {
        fieldMap.remove();
    }
    
    fieldMap = L.map('fieldMapView').setView([lat, lng], 15);
    
    // Add satellite imagery (ESRI World Imagery)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(fieldMap);
    
    // Add labels overlay (town/city names)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Labels &copy; Esri'
    }).addTo(fieldMap);
    
    // Add transportation overlay (roads/streets)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Roads &copy; Esri'
    }).addTo(fieldMap);
    
    // Add marker
    fieldMarker = L.marker([lat, lng]).addTo(fieldMap);
    fieldMarker.bindPopup('<b>Field Location</b>').openPopup();
    
    // Fix map size after modal animation
    setTimeout(() => {
        fieldMap.invalidateSize();
    }, 100);
}

// Close field map modal
function closeFieldMapModal() {
    document.getElementById('fieldMapModal').classList.remove('active');
    if (fieldMap) {
        fieldMap.remove();
        fieldMap = null;
    }
}

// Update application status via API
async function updateApplicationStatus(status) {
    if (!currentApplicationId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${currentApplicationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        });
        
        const result = await response.json();
        console.log('Status updated:', result);
        
        // Refresh the list
        await fetchApplications();
        closeApplicationModal();
        
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
    }
}

// Delete confirmation modal variables
let deleteCallback = null;

// Open delete confirmation modal
function openDeleteModal(message, callback) {
    document.getElementById('deleteMessage').textContent = message;
    deleteCallback = callback;
    document.getElementById('confirmDeleteBtn').onclick = executeDelete;
    document.getElementById('deleteConfirmModal').classList.add('active');
}

// Close delete confirmation modal
function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.remove('active');
    deleteCallback = null;
}

// Execute delete after confirmation
function executeDelete() {
    if (deleteCallback) {
        deleteCallback();
    }
    closeDeleteModal();
}

// Delete application
async function deleteApplication(id) {
    openDeleteModal('Are you sure you want to delete this application?', async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const result = await response.json();
            console.log('Application deleted:', result);
            
            // Refresh the list
            await fetchApplications();
            
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Error deleting application. Please try again.');
        }
    });
}

// Delete job
async function deleteJob(id) {
    openDeleteModal('Are you sure you want to delete this job?', async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const result = await response.json();
            console.log('Job deleted:', result);
            
            // Refresh the list
            await fetchJobs();
            
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Error deleting job. Please try again.');
        }
    });
}

// Update dashboard stats
function updateDashboardStats() {
    const totalEl = document.getElementById('statTotalApps');
    const pendingEl = document.getElementById('statPending');
    const approvedEl = document.getElementById('statApproved');
    const deniedEl = document.getElementById('statDenied');
    const recentBody = document.getElementById('recentApplicationsBody');
    
    if (totalEl) totalEl.textContent = applications.length;
    if (pendingEl) pendingEl.textContent = applications.filter(a => a.status === 'pending').length;
    if (approvedEl) approvedEl.textContent = applications.filter(a => a.status === 'approved').length;
    if (deniedEl) deniedEl.textContent = applications.filter(a => a.status === 'denied').length;
    
    if (recentBody) {
        if (applications.length === 0) {
            recentBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No applications yet</td></tr>';
        } else {
            const recent = applications.slice(0, 3);
            recentBody.innerHTML = recent.map(app => {
                const cropTypes = (app.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
                const totalAcres = (app.fields || []).reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0);
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
// ============================================
// END APPLICATIONS API
// ============================================

// ============================================
// JOBS MANAGEMENT (File-based in S3)
// ============================================

let jobs = [];

// Fetch jobs from S3 jobs/ folder
async function fetchJobs() {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (response.ok) {
            const data = await response.json();
            jobs = data.jobs || [];
            // Ensure each job has an id (fallback to index-based if missing)
            jobs = jobs.map((job, index) => ({
                ...job,
                id: job.id || job.applicationId || job.appId || `JOB-${index + 1}`
            }));
            updateJobsTable();
            updateJobsStats();
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        jobs = [];
        updateJobsTable();
    }
}

// Update job schedule (stored in jobs/ folder)
async function updateJobSchedule(jobId, scheduledDate) {
    if (!jobId) {
        alert('Error: Job ID is missing. Please try again.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                scheduledDate: scheduledDate,
                jobStatus: scheduledDate ? 'scheduled' : 'pending'
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            await fetchJobs();
        } else {
            alert('Error: ' + (result.error || 'Failed to update schedule'));
        }
    } catch (error) {
        console.error('Error updating job:', error);
        alert('Error scheduling job: ' + error.message);
    }
}

// Update job status
async function updateJobStatus(jobId, status) {
    if (status === 'completed' && !confirm('Mark this job as completed?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobStatus: status })
        });
        
        if (response.ok) {
            await fetchJobs();
        }
    } catch (error) {
        console.error('Error updating job status:', error);
    }
}

// Update jobs table - works with application data structure
function updateJobsTable() {
    const tbody = document.getElementById('jobsTableBody');
    if (!tbody) return;
    
    if (jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-data">No jobs yet. Approve an application to create a job.</td></tr>';
        return;
    }
    
    tbody.innerHTML = jobs.map(job => {
        // Calculate fields from application data structure (handle both old and new formats)
        const clientName = job.fullName || job.client || 'N/A';
        const totalAcres = (job.fields || []).reduce((sum, f) => sum + (parseInt(f.fieldSize) || 0), 0) || job.acres || 0;
        const cropTypes = (job.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || job.crops || 'N/A';
        const dateRequested = job.fields?.[0]?.optimalDate || job.optimalDate || 'Not set';
        const status = calculateJobStatus(job.jobStatus, job.fieldStatus) || job.jobStatus || 'pending';
        const statusClass = status === 'scheduled' ? 'scheduled' : 
                           status === 'completed' ? 'completed' :
                           status === 'in_progress' ? 'in_progress' : 'pending';
        const hasDate = !!job.scheduledDate;
        const scheduledDisplay = job.scheduledDate || '<span class="schedule-placeholder">Click to schedule</span>';
        const dateClass = hasDate ? 'scheduled-date has-date' : 'scheduled-date';
        
        return `
            <tr class="clickable-row" onclick="viewJob('${job.id}')">
                <td>${job.id}</td>
                <td>${clientName}</td>
                <td>${job.phone || 'N/A'}</td>
                <td>${totalAcres} acres</td>
                <td>${cropTypes}</td>
                <td>${dateRequested}</td>
                <td class="schedule-cell clickable-schedule" onclick="event.stopPropagation(); openCalendarModal('${job.id}')">
                    <span class="${dateClass}" data-job-id="${job.id}">${scheduledDisplay}</span>
                </td>
                <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
                <td class="actions-cell">
                    <button class="action-btn delete-btn" onclick="event.stopPropagation(); deleteJob('${job.id}')" title="Delete job">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// View job details (same modal as application)
function viewJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    currentApplicationId = jobId; // Reuse the application modal
    const date = job.dateSubmitted ? new Date(job.dateSubmitted).toLocaleString() : 'N/A';
    
    // Initialize fieldStatus array if not exists
    if (!job.fieldStatus || job.fieldStatus.length !== (job.fields?.length || 0)) {
        job.fieldStatus = (job.fields || []).map(() => 'not_complete');
    }
    
    // Calculate display status based on field statuses
    const displayStatus = calculateJobStatus(job.jobStatus, job.fieldStatus || []);
    const displayStatusClass = displayStatus === 'scheduled' ? 'scheduled' : 
                               displayStatus === 'completed' ? 'completed' :
                               displayStatus === 'in_progress' ? 'in_progress' : 'pending';
    
    let fieldsHtml = '';
    if (job.fields && job.fields.length > 0) {
        fieldsHtml = job.fields.map((field, index) => {
            const fieldComplete = job.fieldStatus && job.fieldStatus[index] === 'complete';
            const statusBtnClass = fieldComplete ? 'field-status-btn complete' : 'field-status-btn not-complete';
            const statusBtnText = fieldComplete ? 'Completed' : 'Not Complete';
            return `
            <div class="detail-field-group">
                <div class="field-header-row">
                    <h4>Field ${index + 1}${field.fieldName ? ': ' + field.fieldName : ''}</h4>
                    <button class="${statusBtnClass}" onclick="event.stopPropagation(); toggleFieldStatus('${job.id}', ${index})">${statusBtnText}</button>
                </div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Size</label>
                        <span>${field.fieldSize || 'N/A'} acres</span>
                    </div>
                    <div class="detail-item">
                        <label>Crop Type</label>
                        <span>${field.cropType || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Location</label>
                        <span>
                            ${field.fieldLocation ? 
                                `<span>${field.fieldLocation}</span>
                                 <button class="map-view-btn" onclick="event.stopPropagation(); viewFieldMap('${field.fieldLocation}')" title="View on map">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                                 </button>` 
                                : 'Not specified'}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Chemicals</label>
                        <span>
                            ${field.chemicals && field.chemicals.length > 0 ? field.chemicals.join(', ') : 'Not specified'}
                            ${field.chemicals && field.chemicals.length > 0 && field.fieldSize ? 
                                `<button class="calc-view-btn" onclick="event.stopPropagation(); openCalculatorWithField('${field.fieldSize}', ${JSON.stringify(field.chemicals).replace(/"/g, '&quot;')})" title="Calculate in Chemical Calculator">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>
                                 </button>` 
                                : ''}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Optimal Date</label>
                        <span>${field.optimalDate || 'Not specified'}</span>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    }
    
    const content = `
        <div class="application-detail">
            <div class="application-detail-header">
                <div class="detail-id">${job.id}</div>
                <span class="status ${displayStatusClass}">${displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}</span>
            </div>
            
            <div class="detail-section">
                <h4>Client Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Name</label>
                        <span>${job.fullName || job.client || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone</label>
                        <span>${job.phone || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email</label>
                        <span>${job.email || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Date Submitted</label>
                        <span>${date}</span>
                    </div>
                    ${job.scheduledDate ? `
                    <div class="detail-item">
                        <label>Scheduled Date</label>
                        <span style="color: #3b82f6; font-weight: 500;">${job.scheduledDate}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            ${job.address || job.city || job.state || job.zip ? `
            <div class="detail-section">
                <h4>Address</h4>
                <p>${job.address || ''} ${job.city || ''}, ${job.state || ''} ${job.zip || ''}</p>
            </div>
            ` : ''}
            
            <div class="detail-section">
                <h4>Field Information</h4>
                ${fieldsHtml}
            </div>
            
            ${job.message ? `
            <div class="detail-section">
                <h4>Additional Notes</h4>
                <p>${job.message}</p>
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('applicationDetailContent').innerHTML = content;
    
    // Modal footer is now empty - field status buttons are in field headers
    document.getElementById('modalFooter').innerHTML = '';
    document.getElementById('modalFooter').style.display = 'none';
    
    document.getElementById('applicationDetailModal').classList.add('active');
}

// Calculate job status based on field statuses
function calculateJobStatus(jobStatus, fieldStatus) {
    if (!fieldStatus || fieldStatus.length === 0) return jobStatus || 'pending';
    
    const completedCount = fieldStatus.filter(s => s === 'complete').length;
    
    if (completedCount === fieldStatus.length) {
        return 'completed';
    } else if (completedCount > 0) {
        return 'in_progress';
    }
    return jobStatus || 'pending'; // Keep original status
}

// Toggle field status between not_complete and complete
async function toggleFieldStatus(jobId, fieldIndex) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Initialize fieldStatus if not exists
    if (!job.fieldStatus) {
        job.fieldStatus = (job.fields || []).map(() => 'not_complete');
    }
    
    // Toggle the field status
    const currentStatus = job.fieldStatus[fieldIndex] || 'not_complete';
    job.fieldStatus[fieldIndex] = currentStatus === 'complete' ? 'not_complete' : 'complete';
    
    // Calculate new job status
    const newStatus = calculateJobStatus(job.jobStatus, job.fieldStatus);
    
    try {
        // Update job via API
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fieldStatus: job.fieldStatus,
                jobStatus: newStatus
            })
        });
        
        if (response.ok) {
            // Update local job data
            job.jobStatus = newStatus;
            
            // Refresh the view
            viewJob(jobId);
            fetchJobs();
        } else {
            console.error('Failed to update field status');
            // Revert the change
            job.fieldStatus[fieldIndex] = currentStatus;
        }
    } catch (error) {
        console.error('Error updating field status:', error);
        // Revert the change
        job.fieldStatus[fieldIndex] = currentStatus;
    }
}

// Update jobs stats
function updateJobsStats() {
    const totalJobs = jobs.length;
    const pendingJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus);
        return status === 'pending';
    }).length;
    const scheduledJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus);
        return status === 'scheduled' || status === 'in_progress';
    }).length;
    const completedJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus);
        return status === 'completed';
    }).length;
    
    // Update Jobs tab stats
    const totalEl = document.getElementById('statTotalJobs');
    const pendingEl = document.getElementById('statPendingJobs');
    const scheduledEl = document.getElementById('statScheduledJobs');
    const completedEl = document.getElementById('statCompletedJobs');
    
    if (totalEl) totalEl.textContent = totalJobs;
    if (pendingEl) pendingEl.textContent = pendingJobs;
    if (scheduledEl) scheduledEl.textContent = scheduledJobs;
    if (completedEl) completedEl.textContent = completedJobs;
    
    // Update Overview stats
    const overviewTotalEl = document.getElementById('overviewTotalJobs');
    const overviewPendingEl = document.getElementById('overviewPendingJobs');
    const overviewScheduledEl = document.getElementById('overviewScheduledJobs');
    const overviewCompletedEl = document.getElementById('overviewCompletedJobs');
    
    if (overviewTotalEl) overviewTotalEl.textContent = totalJobs;
    if (overviewPendingEl) overviewPendingEl.textContent = pendingJobs;
    if (overviewScheduledEl) overviewScheduledEl.textContent = scheduledJobs;
    if (overviewCompletedEl) overviewCompletedEl.textContent = completedJobs;
}

// Calendar modal variables
let currentCalendarJobId = null;
let currentCalendarDate = new Date();

// Open calendar modal
function openCalendarModal(jobId) {
    currentCalendarJobId = jobId;
    currentCalendarDate = new Date();
    
    const modal = document.getElementById('calendarModal');
    if (!modal) {
        createCalendarModal();
    }
    
    renderCalendar();
    document.getElementById('calendarModal').classList.add('active');
}

// Close calendar modal
function closeCalendarModal() {
    document.getElementById('calendarModal').classList.remove('active');
    currentCalendarJobId = null;
}

// Create calendar modal HTML
function createCalendarModal() {
    const modalHtml = `
        <div id="calendarModal" class="calendar-modal">
            <div class="calendar-modal-content">
                <div class="calendar-header">
                    <button class="calendar-nav" onclick="changeMonth(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <h3 id="calendarTitle"></h3>
                    <button class="calendar-nav" onclick="changeMonth(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <button class="calendar-close" onclick="closeCalendarModal()">&times;</button>
                </div>
                <div class="calendar-weekdays">
                    <div class="weekday">Sun</div>
                    <div class="weekday">Mon</div>
                    <div class="weekday">Tue</div>
                    <div class="weekday">Wed</div>
                    <div class="weekday">Thu</div>
                    <div class="weekday">Fri</div>
                    <div class="weekday">Sat</div>
                </div>
                <div id="calendarDays" class="calendar-days"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Render calendar
function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('calendarTitle').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let calendarDaysHtml = '';
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        calendarDaysHtml += '<div class="calendar-day empty"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        calendarDaysHtml += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}" 
                 onclick="${!isPast ? `selectDate('${dateStr}')` : ''}">
                ${day}
            </div>
        `;
    }
    
    document.getElementById('calendarDays').innerHTML = calendarDaysHtml;
}

// Change month
function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

// Select date
function selectDate(dateStr) {
    if (currentCalendarJobId) {
        // Save the job ID before closing modal (which resets it)
        const jobIdToSave = currentCalendarJobId;
        
        // Format date for display
        const date = new Date(dateStr + 'T00:00:00');
        const displayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        // Update display immediately (before API call for instant feedback)
        const dateEl = document.querySelector(`.scheduled-date[data-job-id="${jobIdToSave}"]`);
        if (dateEl) {
            dateEl.innerHTML = displayDate;
            dateEl.classList.add('has-date');
        }
        
        // Also update status display immediately
        const row = dateEl?.closest('tr');
        const statusCell = row?.querySelector('.status');
        if (statusCell) {
            statusCell.textContent = 'Scheduled';
            statusCell.className = 'status scheduled';
        }
        
        // Close modal (this resets currentCalendarJobId)
        closeCalendarModal();
        
        // Update job schedule via API using the saved job ID
        updateJobSchedule(jobIdToSave, displayDate);
    }
}

// Override updateApplicationStatus to create job when approved
const originalUpdateApplicationStatus = updateApplicationStatus;
async function updateApplicationStatusWithJob(status) {
    if (!currentApplicationId) return;
    
    console.log('Updating application status:', currentApplicationId, status);
    
    try {
        // Update the application status - Lambda handles job creation when approved
        const response = await fetch(`${API_BASE_URL}/applications/${currentApplicationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        });
        
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Result:', result);
        
        if (response.ok) {
            // Refresh applications and jobs lists
            await fetchApplications();
            await fetchJobs();
            closeApplicationModal();
        } else {
            alert('Error: ' + (result.error || 'Failed to update status'));
        }
        
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
    }
}

// Replace the global updateApplicationStatus function
window.updateApplicationStatus = updateApplicationStatusWithJob;

// Initialize jobs when page loads
fetchJobs();

// ============================================
// END JOBS MANAGEMENT
// ============================================

// Document Management System (S3-backed)
let documents = [];
let categories = [];

async function fetchDocuments() {
    try {
        const response = await fetch(`${API_BASE_URL}/documents`);
        const data = await response.json();
        documents = data.documents || [];
        categories = data.categories || [];
        updateCategoryFilter();
        renderDocuments();
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
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

async function addCategory() {
    const input = document.getElementById('newCategoryInput');
    if (input) {
        const newCat = input.value.trim().toLowerCase();
        if (newCat && !categories.includes(newCat)) {
            const newCategories = [...categories, newCat];
            try {
                await fetch(`${API_BASE_URL}/documents/categories`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ categories: newCategories })
                });
                categories = newCategories;
                updateCategoryList();
                updateCategoryFilter();
                input.value = '';
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
    }
}

async function removeCategory(cat) {
    if (categories.length <= 1) {
        alert('You must have at least one category.');
        return;
    }
    if (confirm(`Remove "${cat}" category?`)) {
        const newCategories = categories.filter(c => c !== cat);
        try {
            await fetch(`${API_BASE_URL}/documents/categories`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: newCategories })
            });
            categories = newCategories;
            updateCategoryList();
            updateCategoryFilter();
            await fetchDocuments();
        } catch (error) {
            console.error('Error removing category:', error);
        }
    }
}

function getCategoryFromType(type) {
    if (type.includes('pdf') || type.includes('word') || type.includes('doc')) return 'contracts';
    if (type.includes('sheet') || type.includes('excel') || type.includes('xls')) return 'reports';
    if (type.includes('image')) return 'other';
    return 'other';
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

async function viewDocument(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`);
        const data = await response.json();
        if (data.downloadUrl) {
            window.open(data.downloadUrl, '_blank');
        }
    } catch (error) {
        console.error('Error viewing document:', error);
    }
}

async function downloadDocument(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`);
        const data = await response.json();
        if (data.downloadUrl) {
            const a = document.createElement('a');
            a.href = data.downloadUrl;
            a.download = data.name;
            a.click();
        }
    } catch (error) {
        console.error('Error downloading document:', error);
    }
}

async function deleteDocument(id) {
    if (confirm('Are you sure you want to delete this document?')) {
        try {
            await fetch(`${API_BASE_URL}/documents/${id}`, {
                method: 'DELETE'
            });
            await fetchDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }
}

async function changeDocumentCategory(docId, newCategory) {
    try {
        await fetch(`${API_BASE_URL}/documents/${docId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: newCategory })
        });
        await fetchDocuments();
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

async function handleFileUpload(files) {
    console.log('handleFileUpload called', files);
    for (const file of Array.from(files)) {
        try {
            const response = await fetch(`${API_BASE_URL}/documents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                })
            });
            const data = await response.json();
            
            if (data.error) {
                alert('Error: ' + data.error);
                continue;
            }
            
            await fetch(data.uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });
            
            await fetch(`${API_BASE_URL}/documents/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    docId: data.docId,
                    storedName: data.storedName,
                    folderKey: data.folderKey,
                    name: file.name,
                    category: getCategoryFromType(file.type),
                    type: file.type,
                    size: file.size
                })
            });
            
            await fetchDocuments();
            
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading ' + file.name);
        }
    }
}

// ============================================
// CHEMICAL INFORMATION MANAGEMENT SYSTEM
// ============================================

// Chemical database and columns
let chemicalDB = [];
let chemicalColumns = [
    { key: 'brandName', label: 'Brand Name', type: 'text' },
    { key: 'chemName', label: 'Chemical Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', options: ['Herbicide', 'Insecticide', 'Fungicide', 'Other'] },
    { key: 'rateRange', label: 'Rate Range', type: 'text' },
    { key: 'rateUnit', label: 'Rate Unit', type: 'select', options: ['oz/acre', 'pt/acre', 'qt/acre', 'gal/acre', 'lb/acre'] },
    { key: 'verified', label: 'Verified', type: 'verified' }
];

async function initChemicalListPage() {
    try {
        const response = await fetch(`${API_BASE_URL}/chemicals`);
        const data = await response.json();
        
        // Load columns from API
        if (data.columns && data.columns.length > 0) {
            chemicalColumns = data.columns;
        }
        
        // Load chemicals
        chemicalDB = data.chemicals || [];
        
        // Also update global chemicalsDB for calculator
        chemicalsDB = JSON.parse(JSON.stringify(chemicalDB));
        
        renderChemicalManagerTable();
    } catch (error) {
        console.error('Error loading chemicals:', error);
        // Keep default columns and empty chemicals
        chemicalDB = [];
        renderChemicalManagerTable();
    }
}

function filterChemicals() {
    renderChemicalManagerTable();
}

function renderChemicalManagerTable() {
    const thead = document.getElementById('chemicalManagerTableHead');
    const tbody = document.getElementById('chemicalManagerTableBody');
    const searchInput = document.getElementById('chemicalSearchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (!thead || !tbody) return;
    
    // Render header
    let headerHtml = '<tr>';
    chemicalColumns.forEach((col) => {
        if (col.type === 'verified') {
            headerHtml += `<th>${col.label}</th>`;
        } else {
            headerHtml += `<th>${col.label}</th>`;
        }
    });
    headerHtml += '<th style="width: 50px;"></th></tr>';
    thead.innerHTML = headerHtml;
    
    // Filter chemicals by search term
    const filteredChemDB = chemicalDB.filter(chem => {
        const brandName = (chem.brandName || '').toLowerCase();
        const chemName = (chem.chemName || '').toLowerCase();
        return brandName.includes(searchTerm) || chemName.includes(searchTerm);
    });
    
    // Render body
    if (filteredChemDB.length === 0) {
        tbody.innerHTML = '<tr><td colspan="' + (chemicalColumns.length + 1) + '" style="text-align: center; padding: 40px; color: var(--text-muted);">' + 
            (chemicalDB.length === 0 ? 'No chemicals added yet. Click "+ Add Chemical" to start.' : 'No chemicals match your search.') + '</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredChemDB.map((chem, rowIndex) => {
        let rowHtml = '<tr data-index="' + rowIndex + '">';
        chemicalColumns.forEach(col => {
            if (col.type === 'text') {
                rowHtml += `
                    <td>
                        <input type="text" value="${chem[col.key] || ''}" 
                            onchange="updateChemField(${rowIndex}, '${col.key}', this.value)">
                    </td>
                `;
            } else if (col.type === 'select') {
                const value = chem[col.key] || '';
                rowHtml += `
                    <td>
                        <select onchange="updateChemField(${rowIndex}, '${col.key}', this.value)">
                            ${col.options.map(opt => 
                                `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`
                            ).join('')}
                        </select>
                    </td>
                `;
            } else if (col.type === 'verified') {
                const isVerified = chem.verified === true;
                rowHtml += `
                    <td>
                        <button class="verified-btn ${isVerified ? 'verified' : 'unverified'}" 
                            onclick="toggleVerified(${rowIndex})">
                            ${isVerified ? 'Verified' : 'Unverified'}
                        </button>
                    </td>
                `;
            }
        });
        rowHtml += `
            <td>
                <button class="delete-row-btn" onclick="deleteChemRow(${rowIndex})" title="Delete">&times;</button>
            </td>
        </tr>`;
        return rowHtml;
    }).join('');
}

function addChemicalManagerRow() {
    const newChem = { verified: false };
    chemicalColumns.forEach(col => {
        if (col.key !== 'verified') {
            newChem[col.key] = '';
        }
    });
    newChem.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    chemicalDB.push(newChem);
    renderChemicalManagerTable();
}

function deleteChemRow(index) {
    if (confirm('Delete this chemical?')) {
        chemicalDB.splice(index, 1);
        renderChemicalManagerTable();
    }
}

function updateChemField(index, key, value) {
    chemicalDB[index][key] = value;
}

function toggleVerified(index) {
    chemicalDB[index].verified = !chemicalDB[index].verified;
    renderChemicalManagerTable();
}

function showAddColumnInput() {
    const input = document.getElementById('newColumnInput');
    input.style.display = 'inline-block';
    input.focus();
}

function handleColumnKeypress(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const colName = input.value.trim();
        if (colName) {
            addColumn(colName);
            input.value = '';
            input.style.display = 'none';
        }
    }
}

function addColumn(colName) {
    const key = colName.toLowerCase().replace(/\s+/g, '_');
    chemicalColumns.push({
        key: key,
        label: colName,
        type: 'text'
    });
    chemicalDB.forEach(chem => {
        chem[key] = '';
    });
    renderChemicalManagerTable();
}

function removeColumn(index) {
    const col = chemicalColumns[index];
    if (confirm(`Remove "${col.label}" column?`)) {
        chemicalColumns.splice(index, 1);
        chemicalDB.forEach(chem => {
            delete chem[col.key];
        });
        renderChemicalManagerTable();
    }
}

async function saveChemicals() {
    try {
        const response = await fetch(`${API_BASE_URL}/chemicals`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                columns: chemicalColumns,
                chemicals: chemicalDB
            })
        });
        
        if (response.ok) {
            // Update global chemicalsDB for calculator
            chemicalsDB = JSON.parse(JSON.stringify(chemicalDB));
            
            // Refresh calculator dropdowns if they exist
            populateChemicalDropdowns();
            
            alert('Chemical list saved successfully!');
        } else {
            const error = await response.json();
            alert('Error saving: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error saving chemicals:', error);
        alert('Error saving chemicals. Please try again.');
    }
}

// ============================================
// COLUMN MANAGER MODAL
// ============================================

// Temporary columns for editing
let editingColumns = [];

const columnManagerModalHTML = `
    <div class="modal-overlay" id="columnManagerModal">
        <div class="modal-content column-manager-modal">
            <div class="modal-header">
                <h3>Manage Columns</h3>
                <button class="modal-close" onclick="closeColumnManagerModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div id="columnListContainer"></div>
                <button class="btn btn-secondary btn-sm" onclick="addColumnInManager()" style="margin-top: 16px;">+ Add Column</button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveColumnChanges()">Save</button>
                <button class="btn btn-secondary" onclick="closeColumnManagerModal()">Cancel</button>
            </div>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', columnManagerModalHTML);

function openColumnManagerModal() {
    editingColumns = JSON.parse(JSON.stringify(chemicalColumns));
    renderColumnList();
    document.getElementById('columnManagerModal').classList.add('active');
}

function closeColumnManagerModal() {
    document.getElementById('columnManagerModal').classList.remove('active');
}

function renderColumnList() {
    const container = document.getElementById('columnListContainer');
    if (!container) return;
    
    container.innerHTML = editingColumns.map((col, index) => `
        <div class="column-item" draggable="true" data-index="${index}">
            <span class="drag-handle">&#9776;</span>
            <input type="text" value="${col.label}" onchange="updateColumnLabel(${index}, this.value)">
            ${index >= 6 ? `<button class="remove-col-btn" onclick="removeColumnInManager(${index})">&times;</button>` : '<span class="col-locked"></span>'}
        </div>
    `).join('');
    
    // Add drag and drop event listeners
    const items = container.querySelectorAll('.column-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.closest('.column-item').dataset.index);
    e.target.closest('.column-item').classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.closest('.column-item').classList.remove('dragging');
    document.querySelectorAll('.column-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.target.closest('.column-item')?.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.closest('.column-item')?.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(e.target.closest('.column-item').dataset.index);
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
        const item = editingColumns.splice(draggedIndex, 1)[0];
        editingColumns.splice(dropIndex, 0, item);
        renderColumnList();
    }
    
    draggedIndex = null;
}

function updateColumnLabel(index, value) {
    const key = value.toLowerCase().replace(/\s+/g, '_');
    editingColumns[index].label = value;
    editingColumns[index].key = key;
}

function addColumnInManager() {
    editingColumns.push({
        key: 'new_column_' + Date.now(),
        label: 'New Column',
        type: 'text'
    });
    renderColumnList();
}

function removeColumnInManager(index) {
    editingColumns.splice(index, 1);
    renderColumnList();
}

function saveColumnChanges() {
    chemicalColumns = JSON.parse(JSON.stringify(editingColumns));
    closeColumnManagerModal();
    renderChemicalManagerTable();
}

// Initialize document event listeners
let uploadInitialized = false;

function initUploadHandlers() {
    if (uploadInitialized) return;
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    console.log('initUploadHandlers called', { uploadArea, fileInput });
    
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
            console.log('File input changed', this.files);
            handleFileUpload(this.files);
        });
        
        uploadInitialized = true;
        console.log('Upload handlers initialized');
    }
}

// Navigation handler - fetch applications when navigating
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const pageKey = this.getAttribute('data-page');
        if (pageKey === 'documents') {
            uploadInitialized = false;
            setTimeout(function() {
                fetchDocuments();
                initUploadHandlers();
            }, 50);
        }
        if (pageKey === 'applications') {
            setTimeout(function() {
                fetchApplications();
            }, 50);
        }
        if (pageKey === 'overview') {
            setTimeout(function() {
                fetchApplications();
                fetchJobs();
            }, 50);
        }
        if (pageKey === 'chemicallist') {
            setTimeout(function() {
                initChemicalListPage();
            }, 50);
        }
    });
});

// Initial render on page load
if (document.getElementById('documentsGrid')) {
    fetchDocuments();
    initUploadHandlers();
}
if (document.getElementById('applicationsTableBody') || document.getElementById('recentApplicationsBody')) {
    fetchApplications();
}
if (document.getElementById('recentApplicationsBody') || document.getElementById('jobsTableBody')) {
    fetchJobs();
}

// Chemical Calculator Functions
let chemicalRowCount = 1;
let chemicalsDB = []; // Chemical database from API

// Fetch chemicals from API on page load
async function fetchChemicalsForCalculator() {
    try {
        const response = await fetch(`${API_BASE_URL}/chemicals`);
        const data = await response.json();
        chemicalsDB = data.chemicals || [];
        populateChemicalDropdowns();
    } catch (error) {
        console.error('Error fetching chemicals:', error);
        // Use fallback list
        chemicalsDB = [
            { id: 'glyphosate', name: 'Glyphosate 53.8%', category: 'herbicide', defaultRate: 32, rateUnit: 'oz' },
            { id: '2-4d', name: '2,4-D Amine', category: 'herbicide', defaultRate: 2, rateUnit: 'pt' },
            { id: 'dicamba', name: 'Dicamba', category: 'herbicide', defaultRate: 12, rateUnit: 'oz' },
            { id: 'atrazine', name: 'Atrazine', category: 'herbicide', defaultRate: 2, rateUnit: 'qt' },
            { id: 'permethrin', name: 'Permethrin', category: 'insecticide', defaultRate: 6.4, rateUnit: 'fl oz' },
            { id: 'malathion', name: 'Malathion', category: 'insecticide', defaultRate: 12.8, rateUnit: 'fl oz' }
        ];
        populateChemicalDropdowns();
    }
}

// Populate all chemical dropdowns with fetched data
function populateChemicalDropdowns() {
    const dropdowns = document.querySelectorAll('.chemical-name');
    dropdowns.forEach(dropdown => {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '<option value="">Select chemical...</option>';
        
        // Group by category
        const grouped = {};
        chemicalsDB.forEach(chem => {
            const category = chem.category ? chem.category.charAt(0).toUpperCase() + chem.category.slice(1) : 'Other';
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push(chem);
        });
        
        // Add grouped options
        Object.keys(grouped).sort().forEach(category => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = category;
            grouped[category].forEach(chem => {
                const option = document.createElement('option');
                option.value = chem.id || chem.name.toLowerCase().replace(/\s+/g, '-');
                option.textContent = chem.name;
                option.dataset.defaultRate = chem.defaultRate || '';
                option.dataset.rateUnit = chem.rateUnit || 'oz';
                optgroup.appendChild(option);
            });
            dropdown.appendChild(optgroup);
        });
        
        // Add custom option at the end
        const customOption = document.createElement('option');
        customOption.value = 'custom';
        customOption.textContent = 'Custom...';
        dropdown.appendChild(customOption);
        
        if (currentValue) dropdown.value = currentValue;
    });
}

// Handle chemical selection - auto-fill rate and unit
function onChemicalSelect(selectElement) {
    const row = selectElement.closest('.chemical-row');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const customInput = row.querySelector('.custom-chem-name');
    const labelRateInput = row.querySelector('.label-rate');
    
    console.log('onChemicalSelect called, value:', selectElement.value, 'row:', row.dataset.row);
    
    if (selectElement.value === 'custom') {
        customInput.style.display = 'block';
        labelRateInput.value = '';
        labelRateInput.readOnly = false;
    } else {
        customInput.style.display = 'none';
        
        // Auto-fill default rate and unit from chemical data
        const chem = chemicalsDB.find(c => {
            const matchKey = c.id || c.name.toLowerCase().replace(/\s+/g, '-');
            return matchKey === selectElement.value;
        });
        
        console.log('Found chem:', chem);
        
        if (chem) {
            // Check if rate range exists and min !== max
            if (chem.rateRange && chem.rateRange.min !== chem.rateRange.max) {
                // Pre-fill with range as suggestion, but allow editing
                labelRateInput.value = `${chem.rateRange.min} - ${chem.rateRange.max}`;
                console.log('Set rate range:', labelRateInput.value);
            } else if (chem.defaultRate) {
                // Pre-fill with default rate, but allow editing
                labelRateInput.value = chem.defaultRate;
                console.log('Set default rate:', labelRateInput.value);
            }
            if (chem.rateUnit) {
                // Strip "/acre" suffix to match dropdown values (e.g., "oz/acre" -> "oz")
                const unitValue = chem.rateUnit.replace('/acre', '');
                row.querySelector('.rate-unit').value = unitValue;
                console.log('Set unit:', unitValue);
            }
        }
    }
    
    calculateChemicalVolume(selectElement);
}

// Calculate total volume based on field size and GPA
function calculateFieldVolume() {
    const fieldSize = parseFloat(document.getElementById('fieldSize').value) || 0;
    const gpa = parseFloat(document.getElementById('fieldGPA').value) || 0;
    const totalVolume = fieldSize * gpa;
    
    document.getElementById('totalVolume').value = totalVolume > 0 ? totalVolume.toFixed(1) : '';
    
    // Recalculate all chemical volumes
    document.querySelectorAll('#fieldChemicalsBody .chemical-row').forEach(row => {
        const labelRateInput = row.querySelector('.label-rate');
        if (labelRateInput.value) {
            calculateChemicalVolume(labelRateInput);
        }
    });
    
    // Update tank calculator
    calculateTankMix();
}

// Calculate volume for a specific chemical
function calculateChemicalVolume(element) {
    const row = element.closest('.chemical-row');
    const labelRateInput = row.querySelector('.label-rate');
    const labelRateValue = labelRateInput.value;
    const chemNameSelect = row.querySelector('.chemical-name');
    const customNameInput = row.querySelector('.custom-chem-name');
    
    // Show/hide custom chemical input
    if (chemNameSelect.value === 'custom') {
        customNameInput.style.display = 'block';
    } else {
        customNameInput.style.display = 'none';
    }
    
    // Calculate chemical volume
    const rateUnit = row.querySelector('.rate-unit').value;
    const fieldSize = parseFloat(document.getElementById('fieldSize').value) || 0;
    
    // Check if label rate is a range (contains " - ")
    const isRange = labelRateValue.includes(' - ');
    
    if (isRange) {
        // Parse range: "min - max"
        const parts = labelRateValue.split(' - ');
        const minRate = parseFloat(parts[0]) || 0;
        const maxRate = parseFloat(parts[1]) || 0;
        
        if (minRate > 0 && fieldSize > 0) {
            const minVolume = convertToGallons(minRate * fieldSize, rateUnit);
            const maxVolume = convertToGallons(maxRate * fieldSize, rateUnit);
            row.querySelector('.chemical-volume').value = `${minVolume.toFixed(2)} - ${maxVolume.toFixed(2)}`;
            row.querySelector('.chemical-volume').dataset.minVolume = minVolume;
            row.querySelector('.chemical-volume').dataset.maxVolume = maxVolume;
        } else {
            row.querySelector('.chemical-volume').value = '';
            row.querySelector('.chemical-volume').dataset.minVolume = '';
            row.querySelector('.chemical-volume').dataset.maxVolume = '';
        }
    } else {
        // Single rate value
        const labelRate = parseFloat(labelRateValue) || 0;
        
        if (labelRate > 0 && fieldSize > 0) {
            const chemVolume = convertToGallons(labelRate * fieldSize, rateUnit);
            row.querySelector('.chemical-volume').value = chemVolume.toFixed(2);
            row.querySelector('.chemical-volume').dataset.minVolume = '';
            row.querySelector('.chemical-volume').dataset.maxVolume = '';
        } else {
            row.querySelector('.chemical-volume').value = '';
            row.querySelector('.chemical-volume').dataset.minVolume = '';
            row.querySelector('.chemical-volume').dataset.maxVolume = '';
        }
    }
    
    // Update tank calculator
    calculateTankMix();
}

// Helper function to convert to gallons based on unit
function convertToGallons(totalAmount, rateUnit) {
    switch(rateUnit) {
        case 'oz':
        case 'fl oz':
            return totalAmount / 128; // 128 oz = 1 gallon
        case 'pt':
            return (totalAmount * 16) / 128; // 1 pt = 16 oz
        case 'qt':
            return (totalAmount * 32) / 128; // 1 qt = 32 oz
        case 'gal':
            return totalAmount; // already in gallons
        case 'lb':
            return totalAmount; // approximate
        default:
            return totalAmount;
    }
}

// Add a new chemical row
function addChemicalRow() {
    chemicalRowCount++;
    const tbody = document.getElementById('fieldChemicalsBody');
    
    const newRow = document.createElement('tr');
    newRow.className = 'chemical-row';
    newRow.dataset.row = chemicalRowCount;
    newRow.innerHTML = `
        <td>
            <select class="chemical-name" onchange="onChemicalSelect(this)">
                <option value="">Select chemical...</option>
                <option value="loading">Loading chemicals...</option>
            </select>
            <input type="text" class="custom-chem-name" placeholder="Custom name" style="display:none; margin-top: 4px;">
        </td>
        <td><input type="text" class="label-rate" placeholder="32 or 16 - 64" oninput="calculateChemicalVolume(this)"></td>
        <td>
            <select class="rate-unit" onchange="calculateChemicalVolume(this)">
                <option value="oz">oz/acre</option>
                <option value="fl oz">fl oz/acre</option>
                <option value="pt">pt/acre</option>
                <option value="qt">qt/acre</option>
                <option value="gal">gal/acre</option>
                <option value="lb">lb/acre</option>
            </select>
        </td>
        <td><input type="text" class="chemical-volume" readonly placeholder="-" style="background: var(--border-light);"></td>
        <td><button class="remove-chem-btn" onclick="removeChemicalRow(this)" title="Remove">&times;</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Populate the new dropdown with chemicals
    if (chemicalsDB.length > 0) {
        populateChemicalDropdowns();
    } else {
        fetchChemicalsForCalculator();
    }
}

// Open calculator with field data from job
function openCalculatorWithField(fieldSize, chemicals) {
    // Close the application detail modal if open
    closeApplicationModal();
    
    // Navigate to calculator page by simulating click
    const calcNavItem = document.querySelector('[data-page="calculator"]');
    if (calcNavItem) {
        calcNavItem.click();
    }
    
    // Wait for page to load and chemicals to be fetched
    setTimeout(() => {
        // Set field size
        document.getElementById('fieldSize').value = fieldSize;
        calculateFieldVolume();
        
        // Clear existing chemical rows except the first one
        const tbody = document.getElementById('fieldChemicalsBody');
        const rows = tbody.querySelectorAll('.chemical-row');
        rows.forEach((row, index) => {
            if (index > 0) row.remove();
        });
        
        // Reset first row
        const firstRow = tbody.querySelector('.chemical-row');
        firstRow.querySelector('.chemical-name').value = '';
        firstRow.querySelector('.label-rate').value = '';
        firstRow.querySelector('.rate-unit').value = 'oz';
        firstRow.querySelector('.chemical-volume').value = '';
        
        // Add rows and select chemicals
        if (chemicalsDB.length > 0) {
            // Chemicals already loaded
            fillChemicalsInCalculator(chemicals);
        } else {
            // Wait for chemicals to load
            fetchChemicalsForCalculator().then(() => {
                fillChemicalsInCalculator(chemicals);
            });
        }
    }, 300);
}

// Fill chemicals in calculator after data is loaded
function fillChemicalsInCalculator(chemicals) {
    const tbody = document.getElementById('fieldChemicalsBody');
    
    chemicals.forEach((chemName, index) => {
        if (index === 0) {
            // Use first row
            const firstRow = tbody.querySelector('.chemical-row');
            const select = firstRow.querySelector('.chemical-name');
            
            // Find the matching chemical in dropdown
            for (let option of select.options) {
                if (option.textContent.toLowerCase().includes(chemName.toLowerCase()) ||
                    chemName.toLowerCase().includes(option.textContent.toLowerCase().split(' ')[0])) {
                    select.value = option.value;
                    onChemicalSelect(select);
                    break;
                }
            }
        } else {
            // Add new row for additional chemicals
            addChemicalRow();
            const rows = tbody.querySelectorAll('.chemical-row');
            const newRow = rows[rows.length - 1];
            const select = newRow.querySelector('.chemical-name');
            
            // Find the matching chemical in dropdown
            setTimeout(() => {
                for (let option of select.options) {
                    if (option.textContent.toLowerCase().includes(chemName.toLowerCase()) ||
                        chemName.toLowerCase().includes(option.textContent.toLowerCase().split(' ')[0])) {
                        select.value = option.value;
                        onChemicalSelect(select);
                        break;
                    }
                }
            }, 50);
        }
    });
}

// Remove a chemical row
function removeChemicalRow(btn) {
    const row = btn.closest('.chemical-row');
    const tbody = document.getElementById('fieldChemicalsBody');
    
    // Keep at least one row
    if (tbody.querySelectorAll('.chemical-row').length > 1) {
        row.remove();
        calculateTankMix();
    }
}

// Calculate tank mix
function calculateTankMix() {
    const tankSize = parseFloat(document.getElementById('tankSize').value) || 0;
    const totalVolume = parseFloat(document.getElementById('totalVolume').value) || 0;
    const tankBody = document.getElementById('tankChemicalsBody');
    
    // Calculate tanks needed
    const tanksNeeded = tankSize > 0 && totalVolume > 0 ? Math.ceil(totalVolume / tankSize) : 0;
    document.getElementById('tanksNeeded').value = tanksNeeded > 0 ? tanksNeeded : '';
    
    // Get all chemical rows
    const chemRows = document.querySelectorAll('#fieldChemicalsBody .chemical-row');
    let hasChemicals = false;
    let tableHtml = '';
    
    chemRows.forEach(row => {
        const chemSelect = row.querySelector('.chemical-name');
        let chemName = chemSelect.options[chemSelect.selectedIndex]?.text || 'Unknown';
        if (chemSelect.value === 'custom') {
            const customName = row.querySelector('.custom-chem-name')?.value;
            chemName = customName || 'Custom Chemical';
        }
        
        const labelRate = row.querySelector('.label-rate').value;
        const rateUnit = row.querySelector('.rate-unit').value;
        const volumeInput = row.querySelector('.chemical-volume');
        const volumeValue = volumeInput.value;
        
        // Check if volume is a range using dataset or value
        const minVol = parseFloat(volumeInput.dataset.minVolume) || 0;
        const maxVol = parseFloat(volumeInput.dataset.maxVolume) || 0;
        const isRange = minVol > 0 && maxVol > 0 && minVol !== maxVol;
        
        let perTankDisplay = '-';
        
        if (chemSelect.value && tanksNeeded > 0) {
            if (isRange) {
                const minPerTank = minVol / tanksNeeded;
                const maxPerTank = maxVol / tanksNeeded;
                perTankDisplay = `${minPerTank.toFixed(2)} - ${maxPerTank.toFixed(2)} gal`;
            } else {
                // Try to parse from value or dataset
                const fieldVolume = minVol || parseFloat(volumeValue) || 0;
                const perTank = fieldVolume / tanksNeeded;
                if (perTank > 0) {
                    perTankDisplay = perTank.toFixed(2) + ' gal';
                }
            }
        }
        
        if (chemSelect.value && labelRate) {
            hasChemicals = true;
            tableHtml += `
                <tr>
                    <td>${chemName}</td>
                    <td>${labelRate}</td>
                    <td>${rateUnit}/acre</td>
                    <td>${perTankDisplay}</td>
                </tr>
            `;
        }
    });
    
    if (hasChemicals) {
        tankBody.innerHTML = tableHtml;
    } else {
        tankBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 20px;">Add chemicals in Field Calculator above</td></tr>';
    }
    
    // Show results if we have data
    if (totalVolume > 0 && tanksNeeded > 0) {
        document.getElementById('resultFieldVolume').textContent = totalVolume.toFixed(1) + ' gallons';
        document.getElementById('resultTanksNeeded').textContent = tanksNeeded;
        document.getElementById('calcResults').style.display = 'block';
    }
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.toggle('active');
        }
    });
    
    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('active');
                }
            }
        }
    });
    
    // Close sidebar when clicking a nav item on mobile
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('active');
                }
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        const sidebar = document.querySelector('.sidebar');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.remove('active');
        if (mobileBtn) mobileBtn.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
});