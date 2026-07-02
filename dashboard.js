// Check authentication immediately - redirect if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

const pages = {
    overview: {
        title: 'Dashboard Overview',
        content: `
            <div class="acres-hero">
                <div class="acres-hero-item">
                    <span class="acres-hero-number" id="overviewGroTechAcres">0</span>
                    <span class="acres-hero-label">GroTech's Total Acres Sprayed</span>
                </div>
                <div class="acres-hero-divider"></div>
                <div class="acres-hero-item">
                    <span class="acres-hero-number" id="overviewYearAcres">0</span>
                    <span class="acres-hero-label">This Year's Acres Sprayed</span>
                </div>
            </div>
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
                                            <div class="chemical-search-wrapper">
                                                <input type="text" class="chemical-search-input" placeholder="Search or select chemical..." oninput="onChemicalSearch(this)" onfocus="showChemicalDropdown(this)" data-selected-id="">
                                                <input type="text" class="custom-chem-name" placeholder="Custom name" style="display:none; margin-top: 4px;">
                                                <div class="chemical-dropdown" onclick="selectChemicalFromDropdown(event)"></div>
                                            </div>
                                        </td>
<td><input type="text" class="label-rate" placeholder="32 or 16 - 64" oninput="calculateChemicalVolume(this)"></td>
                                        <td>
                                            <select class="rate-unit" onchange="calculateChemicalVolume(this)">
                                                <option value="fl oz" selected>fl oz/acre</option>
                                                <option value="oz">oz/acre</option>
                                                <option value="pt">pt/acre</option>
                                                <option value="qt">qt/acre</option>
                                                <option value="gal">gal/acre</option>
                                                <option value="lb">lb/acre</option>
                                                <option value="vv">% v/v</option>
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
                .settings-table {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .settings-header-row {
                    display: grid;
                    grid-template-columns: 1fr 1.6fr 1.4fr 1fr 1.2fr;
                    padding: 0 16px 10px;
                    text-align: center;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--text-muted);
                    font-weight: 500;
                }
                .settings-row-card {
                    display: grid;
                    grid-template-columns: 1fr 1.6fr 1.4fr 1fr 1.2fr;
                    align-items: center;
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 10px;
                    padding: 14px 16px;
                    margin-bottom: 8px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .settings-row-card:hover {
                    border-color: var(--primary-light);
                    box-shadow: 0 0 20px rgba(74, 222, 128, 0.08);
                }
                .settings-row-card .cell {
                    text-align: center;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--primary-light);
                }
                .settings-row-card .cell-unit {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 400;
                    color: var(--text-secondary);
                    margin-left: 3px;
                }
                @media (max-width: 600px) {
                    .settings-header-row {
                        font-size: 0.65rem;
                        padding: 0 10px 8px;
                    }
                    .settings-row-card {
                        padding: 10px 10px;
                    }
                    .settings-row-card .cell {
                        font-size: 0.85rem;
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
            </style>
        `
    },
    faareport: {
        title: 'FAA Monthly Report (44807)',
        content: `
            <div class="faareport-container">
                <div class="faareport-header">
                    <div class="faareport-import-zone" id="faareportImportZone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <span>Import Flight Log (.xlsx) — drag & drop or click to browse</span>
                        <input type="file" id="faareportFileInput" accept=".xlsx,.xls" style="display:none">
                        <button class="btn btn-primary btn-sm" onclick="document.getElementById('faareportFileInput').click()">Choose File</button>
                    </div>
                    <div class="faareport-import-status" id="faareportImportStatus" style="display:none;">
                        <span id="faareportImportMessage"></span>
                        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('faareportFileInput').click()">Re-import</button>
                    </div>

                </div>

                <div class="faareport-form" id="faareportForm">
                    <h3 class="faareport-section-title">Certificate Information</h3>
                    <div class="faareport-section">
                        <div class="faareport-grid-3">
                            <div class="faareport-field">
                                <label>Proponent Name</label>
                                <input type="text" id="faaProponentName" class="faa-input faa-auto-filled" value="GroTech AgriDrones LLC" data-required="true" data-auto="true">
                                <span class="faa-field-status" id="faaProponentNameStatus"></span>
                            </div>
                            <div class="faareport-field">
                                <label>Report Month/Year</label>
                                <input type="text" id="faaReportMonth" class="faa-input" placeholder="e.g. June 2026" data-required="true" data-auto="true">
                                <span class="faa-field-status" id="faaReportMonthStatus"></span>
                            </div>
                        </div>
                        <p class="faareport-detail-note">Aircraft detected from imported flight log. Registration numbers are auto-filled by model.</p>
                        <table class="faa-detail-table">
                            <thead>
                <tr>
                    <th>Aircraft Name</th>
                    <th>UAS Type/Model</th>
                    <th>Registration Number</th>
                    <th style="width:60px;">Flights</th>
                    <th style="width:30px;"></th>
                </tr>
            </thead>
            <tbody id="faaAircraftTableBody">
                <tr class="faa-detail-empty"><td colspan="5">Import a flight log or add aircraft manually.</td></tr>
                            </tbody>
                        </table>
                        <button class="btn btn-secondary btn-sm" onclick="addFaaAircraftRow()">+ Add Aircraft</button>
                    </div>

                    <h3 class="faareport-section-title">Operating Locations</h3>
                    <div class="faareport-section">
                        <p class="faareport-detail-note">Locations detected from import. Fill in coordinates for each, or add more.</p>
                        <table class="faa-detail-table">
                            <thead>
                                <tr>
                                    <th>City / Location Name</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Flights</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="faaLocationsTableBody">
                                <tr class="faa-detail-empty"><td colspan="5">Import a flight log to detect operating locations.</td></tr>
                            </tbody>
                        </table>
                        <button class="btn btn-secondary btn-sm" onclick="addFaaLocationRow()">+ Add Location</button>
                    </div>

                    <h3 class="faareport-section-title">Flight Summary</h3>
                    <div class="faareport-section">
                        <p class="faareport-detail-note">Flights grouped by aircraft and operating location.</p>
                        <table class="faa-detail-table">
                            <thead>
                                <tr>
                                    <th>Aircraft</th>
                                    <th>Location</th>
                                    <th>Number of Flights</th>
                                    <th>Total Hours</th>
                                </tr>
                            </thead>
                            <tbody id="faaBreakdownTableBody">
                                <tr class="faa-detail-empty"><td colspan="4">Import a flight log to populate breakdown.</td></tr>
                            </tbody>
                        </table>
                        <div class="faareport-grid-3" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-light);">
                            <div class="faareport-field">
                                <label>Total Number of Flights</label>
                                <input type="number" id="faaTotalFlights" class="faa-input" min="0" readonly data-required="true" data-auto="true">
                                <span class="faa-field-status" id="faaTotalFlightsStatus"></span>
                            </div>
                            <div class="faareport-field">
                                <label>Total Aircraft Operation Hours</label>
                                <input type="number" id="faaTotalHours" class="faa-input" min="0" step="0.1" readonly data-required="true" data-auto="true">
                                <span class="faa-field-status" id="faaTotalHoursStatus"></span>
                            </div>
                            <div class="faareport-field">
                                <label>Negative Report (zero flights)</label>
                                <div class="faa-radio-group">
                                    <label class="faa-radio"><input type="radio" name="faaNegativeReport" value="No" checked> No</label>
                                    <label class="faa-radio"><input type="radio" name="faaNegativeReport" value="Yes"> Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 class="faareport-section-title">Takeoff or Landing Damage</h3>
                    <div class="faareport-section">
                        <div class="faareport-field">
                            <label>Did any takeoff or landing damage occur this month?</label>
                            <div class="faa-radio-group">
                                <label class="faa-radio"><input type="radio" name="faaToldDamage" value="No" checked onclick="document.getElementById('faaToldDamageDescGroup').style.display='none'"> No</label>
                                <label class="faa-radio"><input type="radio" name="faaToldDamage" value="Yes" onclick="document.getElementById('faaToldDamageDescGroup').style.display='block'"> Yes</label>
                            </div>
                        </div>
                        <div class="faareport-field faareport-field-wide" id="faaToldDamageDescGroup" style="display:none;">
                            <label>Describe damage:</label>
                            <textarea id="faaToldDamageDesc" class="faa-input faa-textarea" placeholder="Describe the damage that occurred..."></textarea>
                        </div>
                    </div>

                    <h3 class="faareport-section-title">Equipment Malfunctions</h3>
                    <div class="faareport-section">
                        <p class="faareport-detail-note">Report failures or malfunctions that occurred. Default all to 0 if none.</p>
                        <table class="faa-detail-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th style="width:80px;">Count</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody id="faaMalfunctionsBody">
                            </tbody>
                        </table>
                    </div>

                    <h3 class="faareport-section-title">Lost Link Events</h3>
                    <div class="faareport-section faareport-grid-3">
                        <div class="faareport-field">
                            <label>Number of Lost Link Events</label>
                            <input type="number" id="faaLostLinkCount" class="faa-input" min="0" value="0" step="1" data-auto="true">
                            <span class="faa-field-status" id="faaLostLinkCountStatus"></span>
                        </div>
                        <div class="faareport-field">
                            <label>Total Duration of Events (minutes)</label>
                            <input type="number" id="faaLostLinkDuration" class="faa-input" min="0" value="0" step="0.1" data-auto="true">
                            <span class="faa-field-status" id="faaLostLinkDurationStatus"></span>
                        </div>
                        <div class="faareport-field">
                            <label>Lost Link Type</label>
                            <input type="text" id="faaLostLinkType" class="faa-input" value="N/A" data-auto="true" placeholder="Control, C2, Performance monitoring, etc.">
                            <span class="faa-field-status" id="faaLostLinkTypeStatus"></span>
                        </div>
                    </div>

                    <h3 class="faareport-section-title">Incident/Accident/Mishap</h3>
                    <div class="faareport-section">
                        <div class="faareport-field">
                            <label>Were there any Incidents/Accidents/Mishaps involving UAS operations?</label>
                            <div class="faa-radio-group">
                                <label class="faa-radio"><input type="radio" name="faaIncident" value="No" checked onclick="document.getElementById('faaIncidentDescGroup').style.display='none'"> No</label>
                                <label class="faa-radio"><input type="radio" name="faaIncident" value="Yes" onclick="document.getElementById('faaIncidentDescGroup').style.display='block'"> Yes</label>
                            </div>
                        </div>
                        <div class="faareport-field faareport-field-wide" id="faaIncidentDescGroup" style="display:none;">
                            <label>Describe the incident/accident/mishap:</label>
                            <textarea id="faaIncidentDesc" class="faa-input faa-textarea" placeholder="Describe the incident, including details per COA Sec. F.3..."></textarea>
                        </div>
                    </div>

                    <div class="faareport-actions">
                        <button class="btn btn-primary btn-lg" id="faaSendBtn" onclick="validateAndSendFaaReport()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            Generate Report
                        </button>
                        <div class="faareport-validation-summary" id="faaValidationSummary" style="display:none;"></div>
                    </div>
                </div>
            </div>

            <style>
                .faareport-container { max-width: 1000px; }
                .faareport-header { margin-bottom: 24px; }
                .faareport-import-zone {
                    background: var(--bg-card);
                    border: 2px dashed var(--border-light);
                    border-radius: 8px;
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .faareport-import-zone:hover { border-color: var(--primary-light); background: rgba(54, 124, 43, 0.05); }
                .faareport-import-zone svg { color: var(--text-muted); flex-shrink: 0; }
                .faareport-import-zone span { color: var(--text-secondary); font-size: 0.9rem; flex: 1; }
                .faareport-import-status {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    padding: 12px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                .faareport-import-status span { font-size: 0.9rem; color: var(--text-secondary); }

                .faareport-section-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--primary-light);
                    margin: 24px 0 12px 0;
                    padding-bottom: 8px;
                    border-bottom: 1px solid var(--border-light);
                }
                .faareport-section {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 20px;
                    display: grid;
                    gap: 16px;
                }
                .faareport-grid-3 { grid-template-columns: repeat(3, 1fr); }
                @media (max-width: 900px) {
                    .faareport-grid-3 { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 600px) {
                    .faareport-grid-3 { grid-template-columns: 1fr; }
                }
                .faareport-field { display: flex; flex-direction: column; gap: 6px; }
                .faareport-field-wide { grid-column: 1 / -1; }
                .faareport-field label { font-size: 0.8rem; font-weight: 500; color: var(--text-secondary); }
                .faa-input {
                    padding: 10px 12px;
                    background: var(--bg-dark);
                    border: 2px solid var(--border-light);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-size: 0.9rem;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }
                .faa-input:focus { outline: none; border-color: var(--primary); }
                .faa-input.faa-auto-filled { border-color: #22c55e; background: rgba(34,197,94,0.05); }
                .faa-input.faa-empty-required { border-color: #ef4444; background: rgba(239,68,68,0.05); }
                .faa-input.faa-user-edited { border-color: #fbbf24; background: rgba(251,191,36,0.05); }
                .faa-textarea { resize: vertical; min-height: 60px; }
                .faa-input[readonly] { opacity: 0.7; cursor: default; }
                .faa-field-status { font-size: 0.75rem; font-weight: 500; }
                .faa-field-status.faa-auto { color: #22c55e; }
                .faa-field-status.faa-empty { color: #ef4444; }
                .faa-field-status.faa-edited { color: #fbbf24; }

                .faa-radio-group { display: flex; gap: 16px; padding: 8px 0; }
                .faa-radio { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; color: var(--text-primary); cursor: pointer; }
                .faa-radio input[type="radio"] { accent-color: var(--primary); }

                .faareport-detail-note { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; }
                .faa-detail-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
                .faa-detail-table th, .faa-detail-table td { padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--border-light); font-size: 0.85rem; }
                .faa-detail-table th { font-size: 0.7rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; background: rgba(0,0,0,0.2); }
                .faa-detail-table td { color: var(--text-secondary); }
                .faa-detail-table input { width: 100%; padding: 6px 8px; background: var(--bg-dark); border: 1px solid var(--border-light); border-radius: 4px; color: var(--text-primary); font-size: 0.85rem; }
                .faa-detail-table .faa-row-del { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; width: 32px; height: 32px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .faa-detail-table .faa-row-del:hover { background: rgba(239,68,68,0.2); }
                .faa-detail-table .faa-map-btn { background: rgba(54,124,43,0.1); border: 1px solid rgba(54,124,43,0.3); color: #4ade80; width: 32px; height: 32px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; }
                .faa-detail-table .faa-map-btn:hover { background: rgba(54,124,43,0.2); }
                .faa-detail-empty td { color: var(--text-muted); font-style: italic; text-align: center; padding: 20px; }

                .faareport-actions { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
                .btn-lg { padding: 14px 32px; font-size: 1rem; display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; }
                .faareport-validation-summary {
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.3);
                    border-radius: 8px;
                    padding: 12px 16px;
                    font-size: 0.9rem;
                    color: #ef4444;
                }
                .faareport-validation-summary.success {
                    background: rgba(34,197,94,0.1);
                    border-color: rgba(34,197,94,0.3);
                    color: #22c55e;
                }
            </style>
        `
    },
    traininglogs: {
        title: 'Training Logs',
        content: `
            <div class="page-header">
                <p>Log and track pilot training sessions, certifications, and recurring training per FAA Exemption No. 23459</p>
            </div>
            <div class="settings-section" id="trainingFormSection">
                <h3>Submit Training Record</h3>
                <form id="trainingForm" class="settings-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trainDate">Date of Training</label>
                            <input type="date" id="trainDate" required>
                        </div>
                        <div class="form-group">
                            <label>Training Modules (select all that apply)</label>
                            <div class="training-modules-grid">
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="G" data-desc="Ground training covering the knowledge requirements of 14 CFR § 137.19(e)(1): effects of agricultural chemicals, safe handling procedures, FAA regulations, principles of safe flight, collision avoidance, obstruction recognition, weather impacts, UAS systems and components, and crew coordination.">
                                    <span class="train-module-label">Ground (G)</span>
                                    <span class="train-module-sub">Initial ground — § 137.19(e)(1)</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="F" data-desc="Flight training covering pre-flight inspection, takeoff and landing procedures, navigation and station-keeping, agricultural spraying runs and patterns, and emergency procedure practice.">
                                    <span class="train-module-label">Flight (F)</span>
                                    <span class="train-module-sub">Initial flight training</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="N" data-desc="Night operations training covering eyesight adjustment to low-light conditions, fatigue management, ground station and landing area illumination, obstacle identification under low light, and pre-flight inspection of anti-collision and identification lighting.">
                                    <span class="train-module-label">Night (N)</span>
                                    <span class="train-module-sub">Night operations</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="M" data-desc="Multi-UAS operations training covering pre-flight inspection for multiple aircraft, automated operational procedures with backup control, coordination of flight paths and altitudes, emergency procedures for multi-UAS including single-system failure isolation, and GCS display identification.">
                                    <span class="train-module-label">Multi-UAS (M)</span>
                                    <span class="train-module-sub">Multi-UAS operations</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="MN" data-desc="Multi-UAS operations at night covering all elements of Night and Multi-UAS training, unique identification light verification per aircraft, and enhanced situational awareness and coordination in low-light conditions.">
                                    <span class="train-module-label">Multi-UAS Night (MN)</span>
                                    <span class="train-module-sub">Multi-UAS at night</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="NV" data-desc="No-Visual-Observer training covering maintaining VLOS at all times, continuous airspace scanning, maintaining UA position awareness, remaining at the GCS while any UAS is in flight, and use of technology for enhanced situational awareness.">
                                    <span class="train-module-label">No-VO (NV)</span>
                                    <span class="train-module-sub">Without visual observer</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="VO" data-desc="Visual Observer training covering VO roles and responsibilities, maintaining effective communication with PIC, VLOS capability, airspace scanning for collision hazards, standard communication terminology, and VO medical and night vision requirements.">
                                    <span class="train-module-label">VO Training (VO)</span>
                                    <span class="train-module-sub">Visual observer</span>
                                </label>
                                <label class="train-module-check">
                                    <input type="checkbox" class="train-module-cb" value="R" data-desc="Recurrent training within 12 calendar months covering review of FAA exemption conditions and limitations, regulatory updates, changes to operations manual or training program, equipment and software changes, incident and accident trends review, refresher on specialized modules, lost-link and emergency procedures, and HAZMAT handling.">
                                    <span class="train-module-label">Recurrent (R)</span>
                                    <span class="train-module-sub">12-month recurrent</span>
                                </label>
                            </div>
                            <p id="trainModuleValidation" class="validation-message" style="display:none;color:#ef4444;font-size:0.85rem;margin-top:6px;">Select at least one training module.</p>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trainAircraft">Aircraft Model</label>
                            <select id="trainAircraft">
                                <option value="">Select model...</option>
                                <option value="DJI Agras T50">DJI Agras T50</option>
                                <option value="DJI Agras T100">DJI Agras T100</option>
                                <option value="N/A">N/A (Ground training only)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="trainHours">Training Hours</label>
                            <input type="number" id="trainHours" placeholder="e.g. 1.5" min="0" step="0.5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="trainTopics">Module Topics / Description</label>
                        <textarea id="trainTopics" rows="4" placeholder="Describe the training activities, topics covered, and maneuvers practiced..." required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trainPicName">Name</label>
                            <input type="text" id="trainPicName" placeholder="Full name" required>
                        </div>
                        <div class="form-group">
                            <label for="trainFaaCert">FAA Certificate Number</label>
                            <input type="text" id="trainFaaCert" placeholder="e.g. 1234567" required>
                        </div>
                    </div>
                    <div class="form-group" style="display:flex;align-items:center;gap:10px;">
                        <label style="margin:0;font-size:0.9rem;font-weight:500;color:var(--text-primary);cursor:pointer;">
                            <input type="checkbox" id="trainSelfCertified" checked style="width:auto;margin-right:8px;accent-color:var(--primary);">
                            Self-certify — I confirm this training was completed per the GroTech AgriDrones Training Program
                        </label>
                    </div>
                    <div class="form-group" style="margin-top: 8px;">
                        <button type="submit" class="btn btn-primary">Submit Training Record</button>
                    </div>
                </form>
            </div>
            <div class="settings-section" id="trainingRecordsSection">
                <h3>Training Records</h3>
                <div id="trainingRecordsContainer"></div>
            </div>

            <style>
                .training-modules-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    margin-top: 8px;
                }
                .train-module-check {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 4px 8px;
                    padding: 12px 14px;
                    background: var(--bg-dark);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .train-module-check:hover {
                    border-color: var(--primary);
                    background: rgba(54, 124, 43, 0.05);
                }
                .train-module-check:has(input:checked) {
                    border-color: var(--primary);
                    background: rgba(54, 124, 43, 0.12);
                }
                .train-module-check input[type="checkbox"] {
                    width: auto;
                    accent-color: var(--primary);
                    margin: 0;
                }
                .train-module-label {
                    font-weight: 600;
                    color: var(--text-primary);
                    font-size: 0.9rem;
                }
                .train-module-sub {
                    width: 100%;
                    padding-left: 28px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }
                @media (max-width: 768px) {
                    .training-modules-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `,
        init: function() {
            const form = document.getElementById('trainingForm');
            if (form) {
                const checkboxes = document.querySelectorAll('.train-module-cb');
                const topicsEl = document.getElementById('trainTopics');
                const moduleValidation = document.getElementById('trainModuleValidation');

                function getSelectedModules() {
                    return Array.from(checkboxes).filter(cb => cb.checked);
                }

                function getModuleCodes() {
                    return getSelectedModules().map(cb => cb.value).join(', ');
                }

                function generateDescription() {
                    const selected = getSelectedModules();
                    if (selected.length === 0) {
                        topicsEl.value = '';
                        return;
                    }
                    const descs = selected.map(cb => cb.getAttribute('data-desc'));
                    topicsEl.value = 'Training modules completed:\n' + selected.map(cb => '• ' + cb.closest('.train-module-check').querySelector('.train-module-label').textContent).join('\n') + '\n\nDescription:\n' + descs.join('\n\n');
                }

                checkboxes.forEach(cb => {
                    cb.addEventListener('change', generateDescription);
                });

                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const selected = getSelectedModules();
                    if (selected.length === 0) {
                        moduleValidation.style.display = 'block';
                        return;
                    }
                    moduleValidation.style.display = 'none';
                    const dateEl = document.getElementById('trainDate');
                    const aircraftEl = document.getElementById('trainAircraft');
                    const hoursEl = document.getElementById('trainHours');
                    const picNameEl = document.getElementById('trainPicName');
                    const faaCertEl = document.getElementById('trainFaaCert');
                    const selfCertEl = document.getElementById('trainSelfCertified');
                    const displayLabels = selected.map(cb => cb.closest('.train-module-check').querySelector('.train-module-label').textContent).join(', ');
                    const record = {
                        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                        date: dateEl.value,
                        module: getModuleCodes(),
                        moduleLabel: displayLabels,
                        aircraftModel: aircraftEl.value,
                        trainingHours: hoursEl.value || '',
                        topics: topicsEl.value,
                        picName: picNameEl.value,
                        faaCertNumber: faaCertEl.value,
                        selfCertified: selfCertEl.checked,
                        submittedAt: new Date().toISOString()
                    };
                    try {
                        await fetch(`${API_BASE_URL}/training`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(record)
                        });
                        form.reset();
                        dateEl.value = new Date().toISOString().split('T')[0];
                        topicsEl.value = '';
                        await fetchTrainingRecords();
                    } catch (err) {
                        console.error('Error saving training record:', err);
                    }
                });
                document.getElementById('trainDate').value = new Date().toISOString().split('T')[0];
            }
            fetchTrainingRecords();
        }
    },
    maintenancelogs: {
        title: 'Maintenance Logs',
        content: `
            <div class="page-header">
                <p>Log and track drone maintenance, repairs, and inspections</p>
            </div>
            <div class="settings-section" id="maintenanceFormSection">
                <h3>Submit Maintenance Record</h3>
                <form id="maintenanceForm" class="settings-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="maintDate">Date of Maintenance</label>
                            <input type="date" id="maintDate" required>
                        </div>
                        <div class="form-group">
                            <label for="maintType">Maintenance Type</label>
                            <select id="maintType" required>
                                <option value="">Select type...</option>
                                <option value="Repair">Repair</option>
                                <option value="Part Replacement">Part Replacement</option>
                                <option value="Functional Test Flight">Functional Test Flight</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="maintAircraftModel">Aircraft Model</label>
                            <select id="maintAircraftModel" required>
                                <option value="">Select model...</option>
                                <option value="DJI Agras T50">DJI Agras T50</option>
                                <option value="DJI Agras T100">DJI Agras T100</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="maintSerialNumber">Serial Number</label>
                            <input type="text" id="maintSerialNumber" placeholder="e.g. T50-XXXX-XXXX" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="maintDescription">Description of Work Performed</label>
                        <textarea id="maintDescription" rows="4" placeholder="Describe the maintenance activity in detail..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="maintParts">Parts Replaced (if any)</label>
                        <input type="text" id="maintParts" placeholder="e.g. Propeller set (x4), nozzle assembly">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="maintTechnician">Technician Name</label>
                            <input type="text" id="maintTechnician" placeholder="Full name" required>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 8px;">
                        <button type="submit" class="btn btn-primary">Submit Maintenance Record</button>
                    </div>
                </form>
            </div>
            <div class="settings-section" id="maintenanceRecordsSection">
                <h3>Maintenance Records</h3>
                <div id="maintenanceRecordsContainer"></div>
            </div>
        `,
        init: function() {
            const form = document.getElementById('maintenanceForm');
            if (form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const record = {
                        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                        date: document.getElementById('maintDate').value,
                        type: document.getElementById('maintType').value,
                        aircraftModel: document.getElementById('maintAircraftModel').value,
                        serialNumber: document.getElementById('maintSerialNumber').value,
                        description: document.getElementById('maintDescription').value,
                        partsReplaced: document.getElementById('maintParts').value,
                        technician: document.getElementById('maintTechnician').value,
                        submittedAt: new Date().toISOString()
                    };
                    try {
                        await fetch(`${API_BASE_URL}/maintenance`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(record)
                        });
                        form.reset();
                        document.getElementById('maintDate').value = new Date().toISOString().split('T')[0];
                        await fetchMaintenanceRecords();
                    } catch (err) {
                        console.error('Error saving maintenance record:', err);
                    }
                });
                document.getElementById('maintDate').value = new Date().toISOString().split('T')[0];

                // Auto-fill serial number when aircraft model changes
                const modelSelect = document.getElementById('maintAircraftModel');
                const serialInput = document.getElementById('maintSerialNumber');
                function getSerialForModel(model) {
                    const map = {
                        'DJI Agras T50': '1581F6BUB237B001PMB4',
                        'DJI Agras T100': '1581F8ZLC257C002HLEO'
                    };
                    return map[model] || '';
                }
                modelSelect.addEventListener('change', function() {
                    serialInput.value = getSerialForModel(this.value);
                });
            }
            fetchMaintenanceRecords();
        }
    }
};

// Maintenance Records — API-backed
let maintenanceRecords = [];

async function fetchMaintenanceRecords() {
    try {
        const response = await fetch(`${API_BASE_URL}/maintenance`);
        const data = await response.json();
        maintenanceRecords = data.records || [];
    } catch (err) {
        console.error('Error fetching maintenance records:', err);
        maintenanceRecords = [];
    }
    renderMaintenanceTable();
}

function renderMaintenanceTable() {
    const container = document.getElementById('maintenanceRecordsContainer');
    if (!container) return;
    if (maintenanceRecords.length === 0) {
        container.innerHTML = `
            <div class="data-table empty-state" style="text-align:center; padding:60px 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3; margin-bottom:16px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 8 13"/><polyline points="16 17 8 17"/><polyline points="10 9 9 9 8 9"/></svg>
                <h3 style="color: var(--text-secondary); margin-bottom:8px;">No Maintenance Records Yet</h3>
                <p style="color: var(--text-muted);">Submit a maintenance record above to see it here.</p>
            </div>
        `;
        return;
    }
    container.innerHTML = `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Aircraft</th>
                        <th>Serial #</th>
                        <th>Description</th>
                        <th>Parts Replaced</th>
                        <th>Technician</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${maintenanceRecords.map(r => `
                        <tr>
                            <td>${r.date}</td>
                            <td><span class="status" style="background:rgba(54,124,43,0.15);color:#22c55e;">${r.type}</span></td>
                            <td>${r.aircraftModel}</td>
                            <td>${r.serialNumber}</td>
                            <td style="max-width:250px;white-space:normal;word-break:break-word;">${r.description}</td>
                            <td>${r.partsReplaced || '—'}</td>
                            <td>${r.technician}</td>
                            <td>${new Date(r.submittedAt).toLocaleString()}</td>
                            <td class="maint-actions">
                                <button class="maint-btn maint-edit" data-id="${r.id}" title="Edit">✎</button>
                                <button class="maint-btn maint-delete" data-id="${r.id}" title="Delete">✕</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:12px;">${maintenanceRecords.length} record${maintenanceRecords.length !== 1 ? 's' : ''} logged</p>
    `;
    // Attach event listeners for edit/delete
    container.querySelectorAll('.maint-edit').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            const record = maintenanceRecords.find(r => r.id === id);
            if (!record) return;
            document.getElementById('maintDate').value = record.date;
            document.getElementById('maintType').value = record.type;
            document.getElementById('maintAircraftModel').value = record.aircraftModel;
            document.getElementById('maintSerialNumber').value = record.serialNumber;
            document.getElementById('maintDescription').value = record.description;
            document.getElementById('maintParts').value = record.partsReplaced || '';
            document.getElementById('maintTechnician').value = record.technician;
            try {
                await fetch(`${API_BASE_URL}/maintenance/${id}`, { method: 'DELETE' });
                await fetchMaintenanceRecords();
            } catch (err) {
                console.error('Error deleting record for edit:', err);
            }
            document.getElementById('maintenanceFormSection').scrollIntoView({ behavior: 'smooth' });
        });
    });
    container.querySelectorAll('.maint-delete').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            try {
                await fetch(`${API_BASE_URL}/maintenance/${id}`, { method: 'DELETE' });
                await fetchMaintenanceRecords();
            } catch (err) {
                console.error('Error deleting maintenance record:', err);
            }
        });
    });
}

// Training Records — API-backed
let trainingRecords = [];

async function fetchTrainingRecords() {
    try {
        const response = await fetch(`${API_BASE_URL}/training`);
        const data = await response.json();
        trainingRecords = data.records || [];
    } catch (err) {
        console.error('Error fetching training records:', err);
        trainingRecords = [];
    }
    renderTrainingTable();
}

function renderTrainingTable() {
    const container = document.getElementById('trainingRecordsContainer');
    if (!container) return;
    if (trainingRecords.length === 0) {
        container.innerHTML = `
            <div class="data-table empty-state" style="text-align:center; padding:60px 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3; margin-bottom:16px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <h3 style="color: var(--text-secondary); margin-bottom:8px;">No Training Records Yet</h3>
                <p style="color: var(--text-muted);">Submit a training record above to see it here.</p>
            </div>
        `;
        return;
    }
    container.innerHTML = `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Aircraft</th>
                        <th>Hours</th>
                        <th>Modules</th>
                    </tr>
                </thead>
                <tbody>
                    ${trainingRecords.map(r => `
                        <tr class="clickable-row" data-id="${r.id}">
                            <td>${r.date}</td>
                            <td>${r.picName}</td>
                            <td>${r.aircraftModel || '—'}</td>
                            <td>${r.trainingHours || '—'}</td>
                            <td>${r.module ? r.module.split(',').map(m => `<span class="status" style="background:rgba(54,124,43,0.15);color:#22c55e;margin:2px 4px 2px 0;">${m.trim()}</span>`).join('') : '—'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:12px;">${trainingRecords.length} record${trainingRecords.length !== 1 ? 's' : ''} logged</p>
    `;
    container.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const record = trainingRecords.find(r => r.id === id);
            if (record) openTrainingDetailModal(record);
        });
    });
}

let trainingDetailCurrentId = null;

function openTrainingDetailModal(record) {
    trainingDetailCurrentId = record.id;
    const modulesArray = record.module ? record.module.split(',').map(s => s.trim()) : [];
    const modulesHtml = modulesArray.length
        ? modulesArray.map(m => `<span class="status" style="background:rgba(54,124,43,0.15);color:#22c55e;margin:2px 4px 2px 0;">${m}</span>`).join('')
        : '<span style="color:var(--text-muted);">—</span>';
    const certifiedHtml = record.selfCertified
        ? '<span style="color:#22c55e;font-weight:600;">Yes</span>'
        : '<span style="color:var(--text-muted);">No</span>';

    document.getElementById('trainingDetailContent').innerHTML = `
        <div class="application-detail-header">
            <span class="detail-id">${record.date}</span>
            ${modulesHtml}
        </div>
        <div class="detail-grid">
            <div class="detail-item">
                <label>Name (PIC)</label>
                <span>${record.picName}</span>
            </div>
            <div class="detail-item">
                <label>FAA Certificate Number</label>
                <span>${record.faaCertNumber || '—'}</span>
            </div>
            <div class="detail-item">
                <label>Aircraft Model</label>
                <span>${record.aircraftModel || '—'}</span>
            </div>
            <div class="detail-item">
                <label>Training Hours</label>
                <span>${record.trainingHours || '—'}</span>
            </div>
            <div class="detail-item full-width">
                <label>Training Modules</label>
                <div style="margin-top:4px;">${modulesHtml}</div>
            </div>
            <div class="detail-item full-width">
                <label>Module Topics / Description</label>
                <div class="detail-message" style="margin-top:4px;white-space:pre-wrap;">${record.topics || '—'}</div>
            </div>
            <div class="detail-item">
                <label>Self-Certified</label>
                <span>${certifiedHtml}</span>
            </div>
            <div class="detail-item">
                <label>Submitted</label>
                <span>${new Date(record.submittedAt).toLocaleString()}</span>
            </div>
        </div>
    `;

    document.getElementById('trainingDetailEditBtn').onclick = async function() {
        closeTrainingDetailModal();
        document.getElementById('trainDate').value = record.date;
        document.querySelectorAll('.train-module-cb').forEach(cb => cb.checked = false);
        if (record.module) {
            const codes = record.module.split(',').map(s => s.trim());
            document.querySelectorAll('.train-module-cb').forEach(cb => {
                if (codes.includes(cb.value)) cb.checked = true;
            });
        }
        document.getElementById('trainAircraft').value = record.aircraftModel || '';
        document.getElementById('trainHours').value = record.trainingHours || '';
        document.getElementById('trainTopics').value = record.topics;
        document.getElementById('trainPicName').value = record.picName;
        document.getElementById('trainFaaCert').value = record.faaCertNumber;
        document.getElementById('trainSelfCertified').checked = record.selfCertified !== false;
        try {
            await fetch(`${API_BASE_URL}/training/${record.id}`, { method: 'DELETE' });
            await fetchTrainingRecords();
        } catch (err) {
            console.error('Error deleting record for edit:', err);
        }
        document.getElementById('trainingFormSection').scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('trainingDetailDeleteBtn').onclick = async function() {
        if (!confirm('Delete this training record? This cannot be undone.')) return;
        try {
            await fetch(`${API_BASE_URL}/training/${record.id}`, { method: 'DELETE' });
            await fetchTrainingRecords();
            closeTrainingDetailModal();
        } catch (err) {
            console.error('Error deleting training record:', err);
        }
    };

    document.getElementById('trainingDetailModal').classList.add('active');
}

function closeTrainingDetailModal() {
    trainingDetailCurrentId = null;
    document.getElementById('trainingDetailModal').classList.remove('active');
}

// Spray Settings Data
const spraySettingsData = {
    t100: {
        name: 'DJI T100',
        settings: {
            fungicide: [
                { gpa: 2, routeSpacing: 30, speed: 66, height: 12, droplet: 350 },
                { gpa: 3, routeSpacing: 30, speed: 66, height: 12, droplet: 350 }
            ],
            herbicide: [
                { gpa: 5, routeSpacing: 25, speed: 45, height: 12, droplet: 500 },
                { gpa: 3, routeSpacing: 25, speed: 45, height: 12, droplet: 500 }
            ],
            insecticide: [
                { gpa: 2, routeSpacing: 38, speed: 64, height: 10, droplet: 250 }
            ],
            fertilizer: [
                { gpa: 5, routeSpacing: 42, speed: 48, height: 8, droplet: 400 }
            ],
            seeds: [
                { gpa: 15, routeSpacing: 48, speed: 32, height: 6, droplet: 500 }
            ]
        }
    },
    t50: {
        name: 'DJI T50',
        settings: {
            fungicide: [
                { gpa: 2, routeSpacing: 26, speed: 32, height: 12, droplet: 300 }
            ],
            herbicide: [
                { gpa: 5, routeSpacing: 23, speed: 25, height: 12, droplet: 500 },
                { gpa: 3, routeSpacing: 23, speed: 25, height: 12, droplet: 500 }
            ],
            insecticide: [
                { gpa: 2, routeSpacing: 38, speed: 32, height: 10, droplet: 250 }
            ],
            fertilizer: [
                { gpa: 5, routeSpacing: 42, speed: 24, height: 8, droplet: 400 }
            ],
            seeds: [
                { gpa: 15, routeSpacing: 48, speed: 16, height: 6, droplet: 500 }
            ]
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
        <div class="settings-table">
            <div class="settings-header-row">
                <span>GPA</span>
                <span>Route Spacing</span>
                <span>Flight Speed</span>
                <span>Height</span>
                <span>Droplet Size</span>
            </div>
            ${Array.isArray(settings) ? settings.slice().sort((a, b) => a.gpa - b.gpa).map(row => `
                <div class="settings-row-card">
                    <span class="cell">${row.gpa}<span class="cell-unit">gpa</span></span>
                    <span class="cell">${row.routeSpacing}<span class="cell-unit">ft</span></span>
                    <span class="cell">${row.speed}<span class="cell-unit">fps</span></span>
                    <span class="cell">${row.height}<span class="cell-unit">ft</span></span>
                    <span class="cell">${row.droplet}<span class="cell-unit">μ</span></span>
                </div>
            `).join('') : ''}
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
        
        // Fetch applications when applications page is loaded
        if (pageKey === 'applications') {
            setTimeout(() => {
                fetchApplications();
            }, 100);
        }
        
        // Fetch jobs when jobs page is loaded
        if (pageKey === 'requests') {
            setTimeout(() => {
                fetchJobs();
            }, 100);
        }
        
        // Fetch documents when documents page is loaded
        if (pageKey === 'documents') {
            uploadInitialized = false;
            setTimeout(() => {
                fetchDocuments();
                initUploadHandlers();
            }, 100);
        }

        // Init FAA report page
        if (pageKey === 'faareport') {
            setTimeout(() => {
                initFaaReportPage();
            }, 100);
        }
        
        // Fetch chemicals list when chemical list page is loaded
        if (pageKey === 'chemicallist') {
            setTimeout(() => {
                initChemicalListPage();
            }, 100);
        }
        
        // Init maintenance logs page
        if (pageKey === 'maintenancelogs') {
            setTimeout(() => {
                if (pages.maintenancelogs.init) pages.maintenancelogs.init();
            }, 100);
        }

        // Init training logs page
        if (pageKey === 'traininglogs') {
            setTimeout(() => {
                if (pages.traininglogs.init) pages.traininglogs.init();
            }, 100);
        }

        // Refresh overview data when overview page is loaded
        if (pageKey === 'overview') {
            setTimeout(() => {
                fetchApplications();
                fetchJobs();
            }, 100);
        }
    });
});

// ============================================
// FAA MONTHLY REPORT (44807) FUNCTIONS
// ============================================

let faaParsedData = null;
let faaInputSetup = false;

function escapeHtml(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(String(str)));
    return d.innerHTML;
}

function initFaaReportPage() {
    if (!faaInputSetup) {
        var monthEl = document.getElementById('faaReportMonth');
        if (monthEl && !monthEl.value) {
            var now = new Date();
            var prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            var names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            monthEl.value = names[prev.getMonth()] + ' ' + prev.getFullYear();
            monthEl.className = 'faa-input faa-auto-filled';
            var statusEl = document.getElementById('faaReportMonthStatus');
            if (statusEl) { statusEl.textContent = 'auto-filled'; statusEl.className = 'faa-field-status faa-auto'; }
        }
    }
    faaParsedData = null;
    document.getElementById('faareportImportStatus').style.display = 'none';
    document.getElementById('faareportForm').style.display = 'block';
    document.getElementById('faaSendBtn').disabled = false;
    var zone = document.getElementById('faareportImportZone');
    if (zone) zone.style.display = 'flex';
    var locBody = document.getElementById('faaLocationsTableBody');
    if (locBody) locBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="5">Import a flight log to detect operating locations.</td></tr>';
    var bkBody = document.getElementById('faaBreakdownTableBody');
    if (bkBody) bkBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="4">Import a flight log to populate breakdown.</td></tr>';
    var acBody = document.getElementById('faaAircraftTableBody');
    if (acBody) acBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="5">Import a flight log or add aircraft manually.</td></tr>';
    populateFaaMalfunctionsTable();
    updateFieldStatuses();
    setupFaaFileInput();
}

function setupFaaFileInput() {
    if (faaInputSetup) return;
    var input = document.getElementById('faareportFileInput');
    if (!input) { setTimeout(setupFaaFileInput, 200); return; }

    input.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            processFaaImport(e.target.files[0]);
        }
    });

    var zone = document.getElementById('faareportImportZone');
    if (zone) {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        zone.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                processFaaImport(e.dataTransfer.files[0]);
            }
        });
        zone.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                document.getElementById('faareportFileInput').click();
            }
        });
    }
    faaInputSetup = true;
}

function processFaaImport(file) {
    const statusEl = document.getElementById('faareportImportStatus');
    const msgEl = document.getElementById('faareportImportMessage');
    const zoneEl = document.getElementById('faareportImportZone');

    if (!file.name.match(/\.xlsx?$/i)) {
        msgEl.textContent = 'Please select an .xlsx file.';
        statusEl.style.display = 'flex';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            let sheetName = null;
            const candidates = ['flight record', 'flight', 'flights', 'Sheet1', 'sheet1', 'data'];
            for (const name of candidates) {
                if (workbook.SheetNames.includes(name)) { sheetName = name; break; }
            }
            if (!sheetName) sheetName = workbook.SheetNames[0];

            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, {defval: ''});

            if (!json || json.length === 0) {
                msgEl.textContent = 'No data found in the file.';
                statusEl.style.display = 'flex';
                return;
            }

            autoFillFaaReport(json);
            zoneEl.style.display = 'none';
            msgEl.textContent = 'Imported ' + json.length + ' flights from ' + file.name;
            statusEl.style.display = 'flex';

        } catch (err) {
            msgEl.textContent = 'Error parsing file: ' + err.message;
            statusEl.style.display = 'flex';
        }
    };
    reader.readAsArrayBuffer(file);
}

function autoFillFaaReport(rows) {
    const keys = Object.keys(rows[0]);
    const keyLower = {};
    keys.forEach(k => {
        keyLower[k.toLowerCase().trim().replace(/[^a-z0-9]/g, '')] = k;
    });

    function getCol(name) {
        const n = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (const k of Object.keys(keyLower)) {
            if (k.includes(n) || n.includes(k)) return keyLower[k];
        }
        return null;
    }

    const flightTimeCol = getCol('flighttime') || getCol('flight time');
    const locationCol = getCol('location');
    const aircraftCol = getCol('aircraftname') || getCol('aircraft name') || getCol('aircraft');
    const durationCol = getCol('flightduration') || getCol('flight duration') || getCol('duration');

    // Group by aircraft x location
    var breakdown = {};
    var locations = {};
    var aircraftSet = {};
    var totalMinutes = 0;
    var hasDateInfo = false;
    var latestDate = null;

    rows.forEach(function(row) {
        var ac = aircraftCol ? String(row[aircraftCol] || '').trim() : 'Unknown';
        var loc = locationCol ? String(row[locationCol] || '').trim() : 'Unknown';
        var bk = ac + '||' + loc;
        if (!breakdown[bk]) breakdown[bk] = { aircraft: ac, location: loc, flights: 0, totalMinutes: 0 };
        breakdown[bk].flights++;
        if (ac) aircraftSet[ac] = true;

        if (locationCol && row[locationCol]) {
            var l = String(row[locationCol]).trim();
            if (l) locations[l] = (locations[l] || 0) + 1;
        }

        if (durationCol) {
            var dur = row[durationCol];
            var mins = 0;
            if (typeof dur === 'string') {
                var parts = dur.split(':');
                if (parts.length >= 2) {
                    mins = parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60 * 100) / 100;
                } else { mins = parseFloat(dur) || 0; }
            } else if (typeof dur === 'number') { mins = dur; }
            breakdown[bk].totalMinutes += mins;
            totalMinutes += mins;
        }

        if (flightTimeCol && row[flightTimeCol]) {
            var dt = new Date(row[flightTimeCol]);
            if (!isNaN(dt.getTime())) {
                hasDateInfo = true;
                if (!latestDate || dt > latestDate) latestDate = dt;
            }
        }
    });

    var totalHours = (totalMinutes / 60).toFixed(1);

    // Report month
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (hasDateInfo && latestDate) {
        setFaaField('faaReportMonth', monthNames[latestDate.getMonth()] + ' ' + latestDate.getFullYear(), true);
    } else {
        var now = new Date();
        setFaaField('faaReportMonth', monthNames[now.getMonth()] + ' ' + now.getFullYear(), true);
    }

    // Certificate
    setFaaField('faaProponentName', 'GroTech AgriDrones LLC', true);

    // Determine model and registration per aircraft
    function getModelInfo(acName) {
        var n = acName.toUpperCase();
        if (n.indexOf('T100') >= 0) return { model: 'DJI Agras T100', reg: '1581F8ZLC257C002HLEO' };
        if (n.indexOf('T50') >= 0 && n.indexOf('T100') < 0) return { model: 'DJI Agras T50', reg: '1581F6BUB237B001PMB4' };
        return { model: 'DJI Agras ' + acName, reg: '' };
    }

    // Compute per-aircraft flight totals across all locations
    var acTotals = {};
    Object.values(breakdown).forEach(function(entry) {
        if (!acTotals[entry.aircraft]) acTotals[entry.aircraft] = 0;
        acTotals[entry.aircraft] += entry.flights;
    });

    // Populate aircraft table
    var acBody = document.getElementById('faaAircraftTableBody');
    acBody.innerHTML = '';
    var acNames = Object.keys(aircraftSet).sort();
    acNames.forEach(function(ac) {
        var info = getModelInfo(ac);
        addFaaAircraftRow(ac, info.model, info.reg, acTotals[ac] || 0);
    });
    if (acNames.length === 0) {
        acBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="5">No aircraft detected.</td></tr>';
    }

    // Breakdown table
    var bkBody = document.getElementById('faaBreakdownTableBody');
    bkBody.innerHTML = '';
    var bkEntries = Object.values(breakdown);
    if (bkEntries.length === 0) {
        bkBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="4">No flight data.</td></tr>';
    } else {
        bkEntries.forEach(function(entry) {
            var hrs = (entry.totalMinutes / 60).toFixed(1);
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + escapeHtml(entry.aircraft) + '</td><td>' + escapeHtml(entry.location) + '</td><td>' + entry.flights + '</td><td>' + hrs + '</td>';
            bkBody.appendChild(tr);
        });
    }

    // Locations table
    var locBody = document.getElementById('faaLocationsTableBody');
    locBody.innerHTML = '';
    var locKeys = Object.keys(locations);
    if (locKeys.length === 0) {
        locBody.innerHTML = '<tr class="faa-detail-empty"><td colspan="5">No locations detected.</td></tr>';
    } else {
        locKeys.forEach(function(loc) { addFaaLocationRow(loc, '', '', locations[loc]); });
    }

    // Totals
    setFaaField('faaTotalFlights', rows.length, true);
    setFaaField('faaTotalHours', parseFloat(totalHours), true);

    // Reset event fields
    setFaaField('faaLostLinkCount', 0, true);
    setFaaField('faaLostLinkDuration', 0, true);
    setFaaField('faaLostLinkType', 'N/A', true);
    var dmgNo = document.querySelector('input[name="faaToldDamage"][value="No"]');
    if (dmgNo) dmgNo.checked = true;
    var dmgDesc = document.getElementById('faaToldDamageDesc');
    if (dmgDesc) dmgDesc.value = '';
    var dmgGrp = document.getElementById('faaToldDamageDescGroup');
    if (dmgGrp) dmgGrp.style.display = 'none';

    var incNo = document.querySelector('input[name="faaIncident"][value="No"]');
    if (incNo) incNo.checked = true;
    var incDesc = document.getElementById('faaIncidentDesc');
    if (incDesc) incDesc.value = '';
    var incGrp = document.getElementById('faaIncidentDescGroup');
    if (incGrp) incGrp.style.display = 'none';

    // Store parsed data
    faaParsedData = {
        totalFlights: rows.length,
        totalHours: totalHours,
        breakdown: bkEntries,
        locations: locKeys,
        aircraftCount: Object.keys(aircraftSet).length
    };

    updateFieldStatuses();
    geocodeFaaLocations();
}

function setFaaField(id, value, autoFilled) {
    var el = document.getElementById(id);
    if (!el) return;
    el.value = value;
    if (autoFilled) {
        el.className = 'faa-input faa-auto-filled';
        el.setAttribute('data-autofilled', 'true');
        var statusEl = document.getElementById(id + 'Status');
        if (statusEl) {
            statusEl.textContent = 'auto-filled';
            statusEl.className = 'faa-field-status faa-auto';
        }
    }
}

function updateFieldStatuses() {
    var autoFields = document.querySelectorAll('.faa-input[data-auto="true"]');
    autoFields.forEach(function(el) {
        var statusEl = document.getElementById(el.id + 'Status');
        if (!statusEl) return;
        if (el.value !== '' && el.value !== '0') {
            if (el.className.indexOf('faa-auto-filled') >= 0) {
                statusEl.textContent = 'auto-filled';
                statusEl.className = 'faa-field-status faa-auto';
            } else {
                statusEl.textContent = 'entered';
                statusEl.className = 'faa-field-status faa-edited';
            }
        } else if (el.getAttribute('data-required') === 'true' && !el.readOnly) {
            el.className = 'faa-input faa-empty-required';
            statusEl.textContent = 'REQUIRED';
            statusEl.className = 'faa-field-status faa-empty';
        }
    });
    var requiredFields = document.querySelectorAll('.faa-input[data-required="true"]:not([data-auto="true"])');
    requiredFields.forEach(function(el) {
        var statusEl = document.getElementById(el.id + 'Status');
        if (!statusEl) return;
        if (!el.value || el.value.trim() === '') {
            el.className = 'faa-input faa-empty-required';
            statusEl.textContent = 'REQUIRED';
            statusEl.className = 'faa-field-status faa-empty';
        }
    });
}

function populateFaaMalfunctionsTable() {
    var tbody = document.getElementById('faaMalfunctionsBody');
    if (!tbody) return;
    var categories = [
        'Control Station', 'Electrical System', 'Fuel System',
        'Navigation System', 'On-board Flight Control System',
        'Powerplant', 'In-Flight Fire'
    ];
    tbody.innerHTML = '';
    categories.forEach(function(cat) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><strong>' + cat + '</strong></td>' +
            '<td><input type="number" class="faa-mal-count" min="0" value="0" step="1" style="width:60px;"></td>' +
            '<td><input type="text" class="faa-mal-desc" placeholder="Describe malfunction (if any)"></td>';
        tbody.appendChild(tr);
    });
}

function removeFaaTableRow(btn) {
    var tr = btn.closest('tr');
    var tbody = tr.parentNode;
    tr.remove();
    if (tbody.querySelectorAll('tr').length === 0) {
        var colspan = tbody.id === 'faaAircraftTableBody' ? '5' : '5';
        var msg = tbody.id === 'faaAircraftTableBody' ? 'No aircraft added.' : 'No locations added.';
        tbody.innerHTML = '<tr class="faa-detail-empty"><td colspan="' + colspan + '">' + msg + '</td></tr>';
    }
}

function addFaaLocationRow(city, lat, lng, flights) {
    var tbody = document.getElementById('faaLocationsTableBody');
    var emptyRow = tbody.querySelector('.faa-detail-empty');
    if (emptyRow) emptyRow.remove();
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="text" placeholder="City name" value="' + escapeHtml(city || '') + '"></td>' +
        '<td><input type="text" placeholder="e.g. 41.7028" value="' + escapeHtml(lat || '') + '"></td>' +
        '<td><input type="text" placeholder="e.g. -88.5112" value="' + escapeHtml(lng || '') + '"></td>' +
        '<td><input type="number" value="' + (flights || 0) + '" readonly style="opacity:0.7;width:60px;"></td>';
    var actionTd = document.createElement('td');
    actionTd.style.cssText = 'padding:8px 10px;display:flex;gap:4px;align-items:center;';
    var mapBtn = document.createElement('button');
    mapBtn.className = 'faa-map-btn';
    mapBtn.type = 'button';
    mapBtn.title = 'Open map to pick coordinates';
    mapBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    mapBtn.onclick = function() { openFaaFieldMap(tr); };
    actionTd.appendChild(mapBtn);
    var delBtn = document.createElement('button');
    delBtn.className = 'faa-row-del';
    delBtn.textContent = '\u00d7';
    delBtn.onclick = function() { removeFaaTableRow(delBtn); };
    actionTd.appendChild(delBtn);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
}

function addFaaAircraftRow(name, model, reg, flights) {
    var tbody = document.getElementById('faaAircraftTableBody');
    var emptyRow = tbody.querySelector('.faa-detail-empty');
    if (emptyRow) emptyRow.remove();
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="text" placeholder="e.g. T50 1" value="' + escapeHtml(name || '') + '"></td>' +
        '<td><input type="text" placeholder="e.g. DJI Agras T50" value="' + escapeHtml(model || '') + '"></td>' +
        '<td><input type="text" placeholder="Registration number" value="' + escapeHtml(reg || '') + '"></td>' +
        '<td><input type="number" value="' + (flights || 0) + '" readonly style="opacity:0.7;"></td>';
    var delTd = document.createElement('td');
    var delBtn = document.createElement('button');
    delBtn.className = 'faa-row-del';
    delBtn.textContent = '\u00d7';
    delBtn.onclick = function() { removeFaaTableRow(delBtn); };
    delTd.appendChild(delBtn);
    tr.appendChild(delTd);
    tbody.appendChild(tr);
}

function geocodeFaaLocations() {
    var rows = document.querySelectorAll('#faaLocationsTableBody tr:not(.faa-detail-empty)');
    rows.forEach(function(tr, idx) {
        var cityInput = tr.querySelector('td:first-child input');
        var latInput = tr.querySelector('td:nth-child(2) input');
        var lngInput = tr.querySelector('td:nth-child(3) input');
        if (!cityInput || !latInput || !lngInput) return;
        if (latInput.value && lngInput.value) return; // already has coords
        var city = cityInput.value.trim();
        if (!city) return;
        var locLower = city.toLowerCase();
        var query = encodeURIComponent(city + (locLower.indexOf('illinois') >= 0 || locLower.indexOf('united states') >= 0 || locLower.indexOf('usa') >= 0 ? '' : ', Illinois, USA'));
        // Append state hint only if not already present
        setTimeout(function() {
            fetch('https://nominatim.openstreetmap.org/search?q=' + query + '&format=json&limit=1')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data && data.length > 0) {
                    latInput.value = parseFloat(data[0].lat).toFixed(6);
                    lngInput.value = parseFloat(data[0].lon).toFixed(6);
                    latInput.className = 'faa-input faa-auto-filled';
                    lngInput.className = 'faa-input faa-auto-filled';
                }
            })
            .catch(function() {});
        }, idx * 1200); // stagger to respect Nominatim rate limit
    });
}

// --- FAA Location Map Picker ---
var faaFieldMap = null;
var faaFieldMarker = null;
var faaFieldMapInit = false;
var faaActiveLocRow = null;

function openFaaFieldMap(tr) {
    faaActiveLocRow = tr;

    document.getElementById('faaFieldMapModal').classList.add('active');

    setTimeout(function() {
        if (!faaFieldMapInit) initFaaFieldMap();
        faaFieldMap.invalidateSize();

        var inputs = tr.querySelectorAll('td input');
        var cityInput = inputs[0];
        var latInput = inputs[1];
        var lngInput = inputs[2];

        // Use existing coords if already filled (from auto geocode during import)
        if (latInput.value && lngInput.value) {
            var lat = parseFloat(latInput.value);
            var lng = parseFloat(lngInput.value);
            if (!isNaN(lat) && !isNaN(lng)) {
                faaFieldMap.setView([lat, lng], 15);
                if (faaFieldMarker) faaFieldMap.removeLayer(faaFieldMarker);
                faaFieldMarker = L.marker([lat, lng], { draggable: true }).addTo(faaFieldMap);
                return;
            }
        }

        // Forward geocode the location name
        var locName = (cityInput.value || '').trim();
        if (!locName) locName = 'Freeport, Illinois';
        var locLower = locName.toLowerCase();
        var query = encodeURIComponent(locName + (locLower.indexOf('illinois') >= 0 || locLower.indexOf('united states') >= 0 || locLower.indexOf('usa') >= 0 ? '' : ', Illinois, USA'));
        fetch('https://nominatim.openstreetmap.org/search?q=' + query + '&format=json&limit=1')
        .then(function(r) {
            if (!r.ok) throw new Error('Nominatim HTTP ' + r.status);
            return r.json();
        })
        .then(function(data) {
            var lat = 42.2975;
            var lng = -89.6438;
            if (data && data.length > 0) {
                lat = parseFloat(data[0].lat);
                lng = parseFloat(data[0].lon);
            }
            faaFieldMap.setView([lat, lng], 15);
            if (faaFieldMarker) faaFieldMap.removeLayer(faaFieldMarker);
            faaFieldMarker = L.marker([lat, lng], { draggable: true }).addTo(faaFieldMap);
        })
        .catch(function() {
            faaFieldMap.setView([42.2975, -89.6438], 10);
        });
    }, 350);
}

function initFaaFieldMap() {
    faaFieldMap = L.map('faaFieldMapView').setView([42.2975, -89.6438], 10);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    }).addTo(faaFieldMap);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Labels &copy; Esri',
        maxZoom: 18
    }).addTo(faaFieldMap);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Roads &copy; Esri',
        maxZoom: 18
    }).addTo(faaFieldMap);

    faaFieldMap.on('click', function(e) {
        if (faaFieldMarker) faaFieldMap.removeLayer(faaFieldMarker);
        faaFieldMarker = L.marker(e.latlng, { draggable: true }).addTo(faaFieldMap);
    });

    faaFieldMapInit = true;
}

function getFaaFieldCoordinates() {
    if (!faaFieldMarker) {
        alert('Please click on the map to place a pin first.');
        return;
    }
    if (!faaActiveLocRow) return;

    var latlng = faaFieldMarker.getLatLng();
    var lat = latlng.lat.toFixed(6);
    var lng = latlng.lng.toFixed(6);

    var inputs = faaActiveLocRow.querySelectorAll('td input');
    var cityInput = inputs[0];
    var latInput = inputs[1];
    var lngInput = inputs[2];

    // Reverse geocode to get a clean address
    fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data && data.display_name) {
            cityInput.value = data.display_name;
        }
    })
    .catch(function() {});

    latInput.value = lat;
    lngInput.value = lng;
    latInput.className = 'faa-input faa-auto-filled';
    lngInput.className = 'faa-input faa-auto-filled';

    closeFaaFieldMapModal();
}

function openFaaAppleMaps() {
    if (!faaFieldMarker) {
        alert('Please click on the map to place a pin first.');
        return;
    }
    var latlng = faaFieldMarker.getLatLng();
    var lat = latlng.lat.toFixed(6);
    var lng = latlng.lng.toFixed(6);
    window.open('https://maps.apple.com/?ll=' + lat + ',' + lng + '&q=' + lat + ',' + lng, '_blank');
}

function clearFaaFieldPin() {
    if (faaFieldMarker) {
        faaFieldMap.removeLayer(faaFieldMarker);
        faaFieldMarker = null;
    }
}

function closeFaaFieldMapModal() {
    document.getElementById('faaFieldMapModal').classList.remove('active');
    faaActiveLocRow = null;
}

function escapeHtmlEmail(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function generateFaaReportHtml(data) {
    var negReport = data.negativeReport === 'yes';
    var month = data.reportMonth;
    var subject = data.proponentName + ' Monthly Report, ' + month;

    function section(title, content) {
        return '<tr><td style="padding:20px 30px 4px 30px;font-size:16px;font-weight:700;color:#1a1a2e;font-family:Arial,sans-serif;" colspan="2">' + title + '</td></tr>' + content;
    }
    function row(label, value) {
        return '<tr><td style="padding:6px 30px 6px 40px;font-size:13px;color:#555;font-family:Arial,sans-serif;white-space:nowrap;vertical-align:top;width:220px;border-bottom:1px solid #eee;">' + label + '</td><td style="padding:6px 30px 6px 10px;font-size:13px;color:#333;font-family:Arial,sans-serif;border-bottom:1px solid #eee;">' + value + '</td></tr>';
    }

    var body = '';

    // Subject line
    body += '<tr><td style="padding:20px 30px 0 30px;font-size:18px;font-weight:700;color:#1a1a2e;font-family:Arial,sans-serif;" colspan="2">Subject: ' + escapeHtmlEmail(subject) + '</td></tr>';
    body += '<tr><td style="padding:4px 30px 16px 30px;font-size:12px;color:#888;font-family:Arial,sans-serif;" colspan="2">To: 9-AVS-FS-AFS-700-Correspondence@faa.gov</td></tr>';

    // 1. Proponent & Aircraft
    body += section('1. Proponent &amp; Aircraft Information',
        row('Proponent', escapeHtmlEmail(data.proponentName)) +
        (data.aircraft && data.aircraft.length > 0 ? data.aircraft.map(function(ac) {
            return row('Aircraft', escapeHtmlEmail(ac.name) + ' &mdash; ' + escapeHtmlEmail(ac.model) + ' (Reg: ' + escapeHtmlEmail(ac.registration) + ', ' + ac.flights + ' flights)');
        }).join('') : row('Aircraft', 'None specified'))
    );

    // 2. UAS Type/Model (already covered in aircraft table)
    // 3. Report Month
    body += section('2. Reporting Month',
        row('Month', escapeHtmlEmail(month))
    );

    // 4. Operating Locations
    body += section('3. Operating Locations',
        (data.locations && data.locations.length > 0 ? data.locations.map(function(loc) {
            return row(escapeHtmlEmail(loc.city), 'Lat: ' + escapeHtmlEmail(loc.latitude) + ', Lng: ' + escapeHtmlEmail(loc.longitude) + ' (' + (loc.flights || 0) + ' flights)');
        }).join('') : row('Locations', 'None'))
    );

    // 5. Flight Breakdown per location per aircraft
    body += section('4. Flight Breakdown (per Location, per Aircraft)',
        (data.flightBreakdown && data.flightBreakdown.length > 0 ? data.flightBreakdown.map(function(bk) {
            return row(escapeHtmlEmail(bk.aircraft) + ' @ ' + escapeHtmlEmail(bk.location), bk.flights + ' flights, ' + bk.hours + ' hrs');
        }).join('') : row('Flights', 'None'))
    );

    // 6. Totals
    body += section('5. Totals',
        row('Total Flights', data.totalFlights) +
        row('Total Hours', data.totalHours.toFixed(1))
    );

    // Negative report indicator
    if (negReport) {
        body += section('6. Negative Report',
            row('Status', 'No operations were conducted this month.')
        );
    }

    // 7. Takeoff/Landing Damage
    body += section('6. Takeoff &amp; Landing Damage',
        row('Damage Occurred', data.takeoffLandingDamage) +
        (data.takeoffLandingDamageDesc ? row('Description', escapeHtmlEmail(data.takeoffLandingDamageDesc)) : '')
    );

    // 8. Equipment Malfunctions
    var malfunctionsHtml = '';
    if (data.equipmentMalfunctions && data.equipmentMalfunctions.length > 0) {
        data.equipmentMalfunctions.forEach(function(m) {
            if (m.count > 0 || m.description) {
                malfunctionsHtml += row(escapeHtmlEmail(m.category), 'Count: ' + (m.count || 0) + (m.description ? ' &mdash; ' + escapeHtmlEmail(m.description) : ''));
            }
        });
    }
    if (!malfunctionsHtml) malfunctionsHtml = row('Malfunctions', 'None reported');
    body += section('7. Equipment Malfunctions', malfunctionsHtml);

    // 9. Lost Link Events
    body += section('8. Lost Link Events',
        row('Number of Events', data.lostLinkCount || 0) +
        row('Total Duration', (data.lostLinkDuration || 0) + ' min') +
        row('Type', escapeHtmlEmail(data.lostLinkType || 'N/A'))
    );

    // 10. Incident/Accident/Mishap
    body += section('9. Incident/Accident/Mishap Reporting',
        row('Incident Occurred', data.incidentOccurred) +
        (data.incidentOccurred === 'Yes' && data.incidentDesc ? row('Description', escapeHtmlEmail(data.incidentDesc)) : '')
    );

    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + escapeHtmlEmail(subject) + '</title></head><body style="margin:0;padding:0;background:#f4f4f7;">' +
        '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;"><tr><td align="center" style="padding:30px 10px;">' +
        '<table width="700" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">' +
        '<tr><td style="padding:30px 30px 10px 30px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:12px 12px 0 0;">' +
        '<h1 style="margin:0;font-size:20px;font-weight:700;color:#4ade80;font-family:Arial,sans-serif;">44807 Monthly Report</h1>' +
        '<p style="margin:6px 0 0 0;font-size:12px;color:#888;font-family:Arial,sans-serif;">Blanket COA &bull; Grant of Exemption &bull; Class G Airspace at or below 400 ft AGL</p>' +
        '</td></tr>' +
        body +
        '<tr><td style="padding:24px 30px;border-top:2px solid #1a1a2e;font-size:11px;color:#999;font-family:Arial,sans-serif;text-align:center;" colspan="2">' +
        'This report is submitted in accordance with FAA COA AFS-25-00608-E, Section F.2.<br>' +
        'Generated by GroTech AgriDrones LLC &mdash; ' + escapeHtmlEmail(month) +
        '</td></tr></table></td></tr></table></body></html>';

    return html;
}

function validateAndSendFaaReport() {
    var summaryEl = document.getElementById('faaValidationSummary');
    summaryEl.style.display = 'none';
    var errors = [];

    var requiredFields = document.querySelectorAll('.faa-input[data-required="true"]');
    requiredFields.forEach(function(el) {
        if (!el.value || (typeof el.value === 'string' && el.value.trim() === '') || (typeof el.value === 'number' && isNaN(el.value))) {
            var label = el.previousElementSibling ? el.previousElementSibling.textContent : el.id;
            errors.push(label + ' is required');
            el.className = 'faa-input faa-empty-required';
        }
    });

    if (errors.length > 0) {
        summaryEl.style.display = 'block';
        summaryEl.className = 'faareport-validation-summary';
        summaryEl.innerHTML = '<strong>Please fix the following:</strong><br>' + errors.join('<br>');
        summaryEl.scrollIntoView({behavior: 'smooth'});
        return;
    }

    var malfunctions = [];
    var malRows = document.querySelectorAll('#faaMalfunctionsBody tr');
    malRows.forEach(function(tr) {
        var inputs = tr.querySelectorAll('input');
        if (inputs.length >= 2) {
            malfunctions.push({
                category: inputs[0].value,
                count: parseInt(inputs[1].value) || 0,
                description: inputs.length >= 3 ? inputs[2].value : ''
            });
        }
    });

    var locations = [];
    var locRows = document.querySelectorAll('#faaLocationsTableBody tr:not(.faa-detail-empty)');
    locRows.forEach(function(tr) {
        var inputs = tr.querySelectorAll('input');
        if (inputs.length >= 4) {
            locations.push({
                city: inputs[0].value,
                latitude: inputs[1].value,
                longitude: inputs[2].value,
                flights: parseInt(inputs[3].value) || 0
            });
        }
    });

    var breakdown = [];
    var bkRows = document.querySelectorAll('#faaBreakdownTableBody tr:not(.faa-detail-empty)');
    bkRows.forEach(function(tr) {
        var tds = tr.querySelectorAll('td');
        if (tds.length >= 4) {
            breakdown.push({
                aircraft: tds[0].textContent,
                location: tds[1].textContent,
                flights: parseInt(tds[2].textContent) || 0,
                hours: parseFloat(tds[3].textContent) || 0
            });
        }
    });

    var aircraft = [];
    var acRows = document.querySelectorAll('#faaAircraftTableBody tr:not(.faa-detail-empty)');
    acRows.forEach(function(tr) {
        var inputs = tr.querySelectorAll('td input');
        if (inputs.length >= 4) {
            aircraft.push({
                name: inputs[0].value,
                model: inputs[1].value,
                registration: inputs[2].value,
                flights: parseInt(inputs[3].value) || 0
            });
        }
    });

    var formData = {
        reportType: '44807',
        proponentName: document.getElementById('faaProponentName').value,
        aircraft: aircraft,
        reportMonth: document.getElementById('faaReportMonth').value,
        totalFlights: parseInt(document.getElementById('faaTotalFlights').value) || 0,
        totalHours: parseFloat(document.getElementById('faaTotalHours').value) || 0,
        negativeReport: document.querySelector('input[name="faaNegativeReport"]:checked').value,
        takeoffLandingDamage: document.querySelector('input[name="faaToldDamage"]:checked').value,
        takeoffLandingDamageDesc: document.getElementById('faaToldDamageDesc').value,
        locations: locations,
        flightBreakdown: breakdown,
        equipmentMalfunctions: malfunctions,
        lostLinkCount: parseInt(document.getElementById('faaLostLinkCount').value) || 0,
        lostLinkDuration: parseFloat(document.getElementById('faaLostLinkDuration').value) || 0,
        lostLinkType: document.getElementById('faaLostLinkType').value,
        incidentOccurred: document.querySelector('input[name="faaIncident"]:checked').value,
        incidentDesc: document.getElementById('faaIncidentDesc').value
    };

    if (faaParsedData) {
        var warnings = [];
        if (formData.totalFlights !== faaParsedData.totalFlights) {
            warnings.push('Total flights (' + formData.totalFlights + ') differs from import (' + faaParsedData.totalFlights + ')');
        }
        if (Math.abs(formData.totalHours - parseFloat(faaParsedData.totalHours)) > 0.5) {
            warnings.push('Total hours (' + formData.totalHours + ') differs from import (' + faaParsedData.totalHours + ')');
        }
        if (warnings.length > 0) {
            if (!confirm('Warnings:\n' + warnings.join('\n') + '\n\nGenerate report anyway?')) return;
        }
    }

    var subject = formData.proponentName + ' Monthly Report, ' + formData.reportMonth;
    var html = generateFaaReportHtml(formData);
    showFaaReportModal(html, subject, formData);
}

function showFaaReportModal(html, subject, formData) {
    var modal = document.getElementById('faaReportModal');
    var subjectEl = document.getElementById('faaReportSubject');
    var iframe = document.getElementById('faaReportIframe');

    subjectEl.textContent = subject;

    iframe.contentDocument.open();
    iframe.contentDocument.write(html);
    iframe.contentDocument.close();

    modal.style.display = 'flex';

    window._faaReportHtml = html;
    window._faaReportSubject = subject;
}

function closeFaaReportModal() {
    document.getElementById('faaReportModal').style.display = 'none';
}

function copyFaaReportSubject() {
    var subject = window._faaReportSubject || '';
    navigator.clipboard.writeText(subject).then(function() {
        var btn = document.querySelector('.faa-report-instructions .btn-primary');
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = orig; }, 2000);
    }).catch(function() {
        alert('Subject: ' + subject);
    });
}

function copyFaaReportBody() {
    var html = window._faaReportHtml || '';
    var text = extractTextFromHtml(html);
    var bodyHtml = extractBodyFromHtml(html);

    var item = new ClipboardItem({
        'text/html': new Blob([bodyHtml], {type: 'text/html'}),
        'text/plain': new Blob([text], {type: 'text/plain'})
    });

    navigator.clipboard.write([item]).then(function() {
        var btn = document.querySelector('#faaReportModal .modal-footer .btn-primary');
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = orig; }, 2000);
    }).catch(function() {
        navigator.clipboard.writeText(text);
    });
}

function extractTextFromHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function extractBodyFromHtml(fullHtml) {
    var match = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return match ? match[1].trim() : fullHtml;
}

// ============================================
// END FAA MONTHLY REPORT FUNCTIONS
// ============================================

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
            // Sort by dateSubmitted (most recent first)
            const sortedApps = [...apps].sort((a, b) => {
                const dateA = new Date(a.dateSubmitted || 0);
                const dateB = new Date(b.dateSubmitted || 0);
                return dateB - dateA;
            });
            const recent = sortedApps.slice(0, 3);
            recentBody.innerHTML = recent.map(app => {
                const cropTypes = (app.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
                const totalAcres = (app.fields || []).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0);
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
    
    // Sort applications by dateSubmitted (most recent first)
    const sortedApps = [...applications].sort((a, b) => {
        const dateA = new Date(a.dateSubmitted || 0);
        const dateB = new Date(b.dateSubmitted || 0);
        return dateB - dateA;
    });
    
    tbody.innerHTML = sortedApps.map(app => {
        const date = new Date(app.dateSubmitted).toLocaleDateString();
        const statusClass = app.status === 'approved' ? 'approved' : app.status === 'denied' ? 'denied' : 'pending';
        const cropTypes = (app.fields || []).map(f => f.cropType).filter(Boolean).join(', ') || 'N/A';
        const totalAcres = (app.fields || []).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0);
        
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
    const coordsEl = document.getElementById('fieldMapCoords');
    if (coordsEl) coordsEl.textContent = `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    
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

// ============================================
// END APPLICATIONS API
// ============================================

// ============================================
// JOBS MANAGEMENT (File-based in S3)
// ============================================

let jobs = [];
const ACRES_BASELINE = 3694;

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
        const totalAcres = (job.fields || []).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0) || job.acres || 0;
        const cropTypes = [...new Set((job.fields || []).map(f => f.cropType).filter(Boolean))].join(', ') || job.crops || 'N/A';
        const dateRequested = job.fields?.[0]?.optimalDate || job.optimalDate || 'Not set';
        const status = calculateJobStatus(job.jobStatus, job.fieldStatus, job.scheduledDate) || job.jobStatus || 'pending';
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
                    <button class="action-btn edit-btn" onclick="event.stopPropagation(); openEditJobModal('${job.id}')" title="Edit job">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn delete-btn" onclick="event.stopPropagation(); deleteJob('${job.id}')" title="Delete job">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// View job details (same modal as application)
async function viewJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Ensure chemicals are loaded for URL lookups
    if (chemicalsDB.length === 0) {
        await fetchChemicalsForCalculator();
    }
    
    currentApplicationId = jobId; // Reuse the application modal
    const date = job.dateSubmitted ? new Date(job.dateSubmitted).toLocaleString() : 'N/A';
    
    // Initialize fieldStatus array if not exists
    if (!job.fieldStatus || job.fieldStatus.length !== (job.fields?.length || 0)) {
        job.fieldStatus = (job.fields || []).map(() => 'not_complete');
    }
    
    // Calculate display status based on field statuses
    const displayStatus = calculateJobStatus(job.jobStatus, job.fieldStatus || [], job.scheduledDate);
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
                <div class="field-detail-layout">
                    <div class="field-info-left">
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
                            <label>GPA</label>
                            <span>${field.gpa || 'Not specified'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Optimal Date</label>
                            <span>${field.optimalDate || 'Not specified'}</span>
                        </div>
                    </div>
                    <div class="field-chemicals-right">
                        <div class="detail-item">
                            <label>Chemicals</label>
                            <span>
                                ${field.chemicals && field.chemicals.length > 0 ? 
                                    '<div class="chemical-rates-list">' + field.chemicals.map((chem, ci) => {
                                        const rateVal = (field.chemicalRates && field.chemicalRates[ci]) || '';
                                        const unitVal = (field.chemicalRateUnits && field.chemicalRateUnits[ci]) || '';
                                        return '<div class="chemical-rate-row">' +
                                            (function(){var e=chem.replace(/'/g,"\\'"),m=findChemicalMatch(chem),u=m&&m.label?m.label.trim():'';return u?'<a href="'+u.replace(/"/g,'&quot;')+'" target="_blank" rel="noopener noreferrer" class="chem-name-link">'+e+'</a>':'<span class="chem-name">'+e+'</span>'})() +
                                            '<span class="chem-rate-sep">@</span>' +
                                            '<input type="text" class="chem-rate-input" value="' + rateVal.replace(/"/g, '&quot;') + '" placeholder="rate" data-job-id="' + job.id + '" data-field-index="' + index + '" data-chem-index="' + ci + '" oninput="debouncedSaveChemicalRates()">' +
                                            '<select class="chem-rate-unit" data-job-id="' + job.id + '" data-field-index="' + index + '" data-chem-index="' + ci + '" onchange="debouncedSaveChemicalRates()">' +
                                                '<option value="fl oz"' + (unitVal === 'fl oz' ? ' selected' : '') + '>fl oz/acre</option>' +
                                                '<option value="oz"' + (unitVal === 'oz' ? ' selected' : '') + '>oz/acre</option>' +
                                                '<option value="pt"' + (unitVal === 'pt' ? ' selected' : '') + '>pt/acre</option>' +
                                                '<option value="qt"' + (unitVal === 'qt' ? ' selected' : '') + '>qt/acre</option>' +
                                                '<option value="gal"' + (unitVal === 'gal' ? ' selected' : '') + '>gal/acre</option>' +
                                                '<option value="lb"' + (unitVal === 'lb' ? ' selected' : '') + '>lb/acre</option>' +
                                                '<option value="vv"' + (unitVal === 'vv' ? ' selected' : '') + '>% v/v</option>' +
                                            '</select>' +
                                        '</div>';
                                    }).join('') + '</div>'
                                    : 'Not specified'}
                                ${field.chemicals && field.chemicals.length > 0 && field.fieldSize ? 
                                    `<button class="calc-view-btn" onclick="event.stopPropagation(); openCalculatorWithField('${field.fieldSize}', ${JSON.stringify(field.chemicals).replace(/"/g, '&quot;')})" title="Calculate in Chemical Calculator">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>
                                     </button>` 
                                    : ''}
                            </span>
                        </div>
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
                        <label>Preferred Contact</label>
                        <span>${job.contactMethod || 'N/A'}</span>
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

// Auto-save chemical rates for job detail view
let saveChemicalRatesTimeout = null;
function debouncedSaveChemicalRates() {
    if (saveChemicalRatesTimeout) clearTimeout(saveChemicalRatesTimeout);
    saveChemicalRatesTimeout = setTimeout(() => {
        saveChemicalRates();
    }, 500);
}

async function saveChemicalRates() {
    const jobId = currentApplicationId;
    const job = jobs.find(j => j.id === jobId);
    if (!job || !job.fields) return;

    const fieldRates = {};
    const fieldUnits = {};

    document.querySelectorAll('.chem-rate-input').forEach(input => {
        const fieldIdx = parseInt(input.dataset.fieldIndex);
        const chemIdx = parseInt(input.dataset.chemIndex);
        if (!fieldRates[fieldIdx]) fieldRates[fieldIdx] = [];
        fieldRates[fieldIdx][chemIdx] = input.value;
    });

    document.querySelectorAll('.chem-rate-unit').forEach(select => {
        const fieldIdx = parseInt(select.dataset.fieldIndex);
        const chemIdx = parseInt(select.dataset.chemIndex);
        if (!fieldUnits[fieldIdx]) fieldUnits[fieldIdx] = [];
        fieldUnits[fieldIdx][chemIdx] = select.value;
    });

    job.fields.forEach((field, idx) => {
        field.chemicalRates = fieldRates[idx] || (field.chemicals || []).map(() => '');
        field.chemicalRateUnits = fieldUnits[idx] || (field.chemicals || []).map(() => 'fl oz');
    });

    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: job.fields })
        });
        if (!response.ok) {
            console.error('Failed to save chemical rates');
        }
    } catch (error) {
        console.error('Error saving chemical rates:', error);
    }
}

// Calculate job status based on field statuses
function calculateJobStatus(jobStatus, fieldStatus, scheduledDate) {
    if (!fieldStatus || fieldStatus.length === 0) {
        return jobStatus || (scheduledDate ? 'scheduled' : 'pending');
    }
    
    const completedCount = fieldStatus.filter(s => s === 'complete').length;
    
    if (completedCount === fieldStatus.length) {
        return 'completed';
    } else if (completedCount > 0) {
        return 'in_progress';
    }
    return scheduledDate ? 'scheduled' : 'pending';
}

// Toggle field status between not_complete and complete
async function toggleFieldStatus(jobId, fieldIndex) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Initialize fieldStatus if not exists
    if (!job.fieldStatus) {
        job.fieldStatus = (job.fields || []).map(() => 'not_complete');
    }
    // Initialize fieldCompletionDates if not exists
    if (!job.fieldCompletionDates) {
        job.fieldCompletionDates = (job.fields || []).map(() => null);
    }
    
    // Toggle the field status
    const currentStatus = job.fieldStatus[fieldIndex] || 'not_complete';
    const newStatusValue = currentStatus === 'complete' ? 'not_complete' : 'complete';
    
    // Validate chemical rates before completing field
    if (newStatusValue === 'complete') {
        const field = job.fields[fieldIndex];
        if (field && field.chemicals && field.chemicals.length > 0) {
            const rates = field.chemicalRates || [];
            const allHaveRates = field.chemicals.every((chem, i) => {
                return rates[i] && rates[i].trim() !== '' && !isNaN(parseFloat(rates[i]));
            });
            if (!allHaveRates) {
                alert('Please enter a chemical rate for all chemicals before marking this field as complete.');
                return;
            }
        }
    }
    job.fieldStatus[fieldIndex] = newStatusValue;
    
    // Track completion date
    job.fieldCompletionDates[fieldIndex] = newStatusValue === 'complete' ? new Date().toISOString() : null;
    
    // Calculate new job status
    const newJobStatus = calculateJobStatus(job.jobStatus, job.fieldStatus, job.scheduledDate);
    
    try {
        // Update job via API
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fieldStatus: job.fieldStatus,
                fieldCompletionDates: job.fieldCompletionDates,
                jobStatus: newJobStatus
            })
        });
        
        if (response.ok) {
            // Update local job data
            job.jobStatus = newJobStatus;
            
            // Refresh the view
            viewJob(jobId);
            fetchJobs();
        } else {
            console.error('Failed to update field status');
            // Revert the change
            job.fieldStatus[fieldIndex] = currentStatus;
            job.fieldCompletionDates[fieldIndex] = null;
        }
    } catch (error) {
        console.error('Error updating field status:', error);
        // Revert the change
        job.fieldStatus[fieldIndex] = currentStatus;
        job.fieldCompletionDates[fieldIndex] = null;
    }
}

// Open edit job modal
async function openEditJobModal(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    currentApplicationId = jobId;
    
    // Fetch chemicals if not already loaded
    if (chemicalsDB.length === 0) {
        await fetchChemicalsForCalculator();
    }
    
    let fieldsHtml = '';
    if (job.fields && job.fields.length > 0) {
        fieldsHtml = job.fields.map((field, index) => {
            const chemicalsJson = JSON.stringify(field.chemicals || []).replace(/'/g, "\\'");
            return `
                <div class="edit-field-group">
                    <div class="edit-field-header">
                        <h4>Field ${index + 1}</h4>
                        ${index > 0 ? `<button type="button" class="remove-field-btn" onclick="removeEditFieldGroup(${index})" title="Remove field">✕</button>` : ''}
                    </div>
                    <div class="edit-form-grid">
                        <div class="form-group">
                            <label>Field Name</label>
                            <input type="text" id="edit_fieldName_${index}" value="${field.fieldName || ''}">
                        </div>
                        <div class="form-group">
                            <label>Field Size (acres)</label>
                            <input type="number" id="edit_fieldSize_${index}" value="${field.fieldSize || ''}">
                        </div>
                        <div class="form-group">
                            <label>Crop Type</label>
                            <select id="edit_cropType_${index}">
                                <option value="">Select crop...</option>
                                <option value="Corn" ${field.cropType === 'Corn' ? 'selected' : ''}>Corn</option>
                                <option value="Soybeans" ${field.cropType === 'Soybeans' ? 'selected' : ''}>Soybeans</option>
                                <option value="Wheat" ${field.cropType === 'Wheat' ? 'selected' : ''}>Wheat</option>
                                <option value="Alfalfa" ${field.cropType === 'Alfalfa' ? 'selected' : ''}>Alfalfa</option>
                                <option value="Cotton" ${field.cropType === 'Cotton' ? 'selected' : ''}>Cotton</option>
                                <option value="Sorghum" ${field.cropType === 'Sorghum' ? 'selected' : ''}>Sorghum</option>
                                <option value="Rice" ${field.cropType === 'Rice' ? 'selected' : ''}>Rice</option>
<option value="Weeds" ${field.cropType === 'Weeds' ? 'selected' : ''}>Weeds</option>
                                 <option value="Other" ${field.cropType === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Field Location</label>
                            <div class="location-input-wrapper">
                                <input type="text" id="edit_fieldLocation_${index}" value="${field.fieldLocation || ''}" placeholder="Click map to select location" readonly>
                                <button type="button" class="location-map-btn" onclick="openEditFieldMap(${index})" title="Select location on map">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                                </button>
                            </div>
                        </div>
                            <div class="form-group" style="grid-column: span 2;">
                            <label>Chemicals</label>
                            <div class="chemical-selector">
                                <div class="chemical-input-wrapper">
                                    <input type="text" id="edit_chemicalSearch_${index}" class="chemical-search" placeholder="Search chemicals..." oninput="filterEditChemicals(${index})" onfocus="showEditChemicalDropdown(${index})">
                                    <div class="chemical-dropdown" id="edit_chemicalDropdown_${index}">
                                        <div class="chemical-options" id="edit_chemicalOptions_${index}"></div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-secondary btn-sm" onclick="addEditChemical(${index})">Add</button>
                            </div>
                            <div class="custom-chemical-input" id="edit_customChemical_${index}" style="display: none;">
                                <input type="text" class="custom-chem-field" placeholder="Enter chemical name..." onkeypress="if(event.key==='Enter'){submitEditCustomChemical(${index}); return false;}">
                                <button type="button" class="btn btn-primary btn-sm" onclick="submitEditCustomChemical(${index})">Confirm</button>
                            </div>
                            <div class="selected-chemicals" id="edit_selectedChemicals_${index}"></div>
                        </div>
                        ${index > 0 ? `
                        <div class="form-group">
                            <label>Copy from Field</label>
                            <select id="edit_copyFrom_${index}" onchange="copyFieldChemicals(${index}, this.value)" style="margin-top: 4px;">
                                <option value="">Copy from field</option>
                                ${job.fields.map((f, i) => i !== index ? `<option value="${i}">Field ${i + 1}</option>` : '').join('')}
                            </select>
                        </div>
                        ` : ''}
                        <div class="form-group">
                            <label>GPA</label>
                            <input type="text" id="edit_gpa_${index}" value="${field.gpa || ''}" placeholder="e.g., 15 gal/acre">
                        </div>
                        <div class="form-group">
                            <label>Optimal Date</label>
                            <input type="text" id="edit_optimalDate_${index}" value="${field.optimalDate || ''}" placeholder="Click to select date" readonly onclick="openEditFieldCalendar(${index})">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    const content = `
        <div class="edit-job-form">
            <div class="edit-section">
                <h4>Client Information</h4>
                <div class="edit-form-grid">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="edit_fullName" value="${job.fullName || job.client || ''}">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" id="edit_phone" value="${job.phone || ''}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="edit_email" value="${job.email || ''}">
                    </div>
                    <div class="form-group">
                        <label>Preferred Contact</label>
                        <div class="edit-checkbox-group">
                            <label class="edit-checkbox-label">
                                <input type="checkbox" name="edit_contactMethod" value="phone" ${job.contactMethod && job.contactMethod.includes('phone') ? 'checked' : ''}>
                                <span>Phone Call</span>
                            </label>
                            <label class="edit-checkbox-label">
                                <input type="checkbox" name="edit_contactMethod" value="email" ${job.contactMethod && job.contactMethod.includes('email') ? 'checked' : ''}>
                                <span>Email</span>
                            </label>
                            <label class="edit-checkbox-label">
                                <input type="checkbox" name="edit_contactMethod" value="text" ${job.contactMethod && job.contactMethod.includes('text') ? 'checked' : ''}>
                                <span>Text Message</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Scheduled Date</label>
                        <input type="text" id="edit_scheduledDate" value="${job.scheduledDate || ''}" placeholder="Click to select date" readonly onclick="openScheduledCalendar()">
                    </div>
                </div>
            </div>
            
            <div class="edit-section">
                <h4>Address</h4>
                <div class="edit-form-grid">
                    <div class="form-group" style="grid-column: span 2;">
                        <label>Street Address</label>
                        <input type="text" id="edit_address" value="${job.address || ''}">
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="edit_city" value="${job.city || ''}">
                    </div>
                    <div class="form-group">
                        <label>State</label>
                        <input type="text" id="edit_state" value="${job.state || ''}">
                    </div>
                    <div class="form-group">
                        <label>Zip Code</label>
                        <input type="text" id="edit_zip" value="${job.zip || ''}">
                    </div>
                </div>
            </div>
            
            <div class="edit-section">
                <h4>Field Information</h4>
                <div id="editFieldGroups">
                    ${fieldsHtml}
                </div>
                <button type="button" class="btn btn-secondary add-field-btn" onclick="addEditFieldGroup()">
                    + Add Another Field
                </button>
            </div>
            
            <div class="edit-section">
                <h4>Additional Notes</h4>
                <div class="form-group">
                    <textarea id="edit_message" rows="3">${job.message || ''}</textarea>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('editJobContent').innerHTML = content;
    document.getElementById('editJobModal').classList.add('active');
    
    window.editFieldCount = job.fields ? job.fields.length : 0;
    
    // Initialize selected chemicals and rates for each field
    if (job.fields && job.fields.length > 0) {
        job.fields.forEach((field, index) => {
            const chemCount = (field.chemicals || []).length;
            window[`editChemicalRates_${index}`] = [...(field.chemicalRates || Array(chemCount).fill(''))];
            window[`editChemicalRateUnits_${index}`] = [...(field.chemicalRateUnits || Array(chemCount).fill('fl oz'))];
            initializeEditChemicals(job, index);
        });
    }
}

// Add a new field group in the edit job modal
function addEditFieldGroup() {
    const index = window.editFieldCount;
    window.editFieldCount = index + 1;

    const html = `
        <div class="edit-field-group">
            <div class="edit-field-header">
                <h4>Field ${index + 1}</h4>
                <button type="button" class="remove-field-btn" onclick="removeEditFieldGroup(${index})" title="Remove field">✕</button>
            </div>
            <div class="edit-form-grid">
                <div class="form-group">
                    <label>Field Name</label>
                    <input type="text" id="edit_fieldName_${index}" value="">
                </div>
                <div class="form-group">
                    <label>Field Size (acres)</label>
                    <input type="number" id="edit_fieldSize_${index}" value="">
                </div>
                <div class="form-group">
                    <label>Crop Type</label>
                    <select id="edit_cropType_${index}">
                        <option value="">Select crop...</option>
                        <option value="Corn">Corn</option>
                        <option value="Soybeans">Soybeans</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Alfalfa">Alfalfa</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Sorghum">Sorghum</option>
                        <option value="Rice">Rice</option>
                        <option value="Weeds">Weeds</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Field Location</label>
                    <div class="location-input-wrapper">
                        <input type="text" id="edit_fieldLocation_${index}" value="" placeholder="Click map to select location" readonly>
                        <button type="button" class="location-map-btn" onclick="openEditFieldMap(${index})" title="Select location on map">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                        </button>
                    </div>
                </div>
                <div class="form-group" style="grid-column: span 2;">
                    <label>Chemicals</label>
                    <div class="chemical-selector">
                        <div class="chemical-input-wrapper">
                            <input type="text" id="edit_chemicalSearch_${index}" class="chemical-search" placeholder="Search chemicals..." oninput="filterEditChemicals(${index})" onfocus="showEditChemicalDropdown(${index})">
                            <div class="chemical-dropdown" id="edit_chemicalDropdown_${index}">
                                <div class="chemical-options" id="edit_chemicalOptions_${index}"></div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="addEditChemical(${index})">Add</button>
                    </div>
                    <div class="custom-chemical-input" id="edit_customChemical_${index}" style="display: none;">
                        <input type="text" class="custom-chem-field" placeholder="Enter chemical name..." onkeypress="if(event.key==='Enter'){submitEditCustomChemical(${index}); return false;}">
                        <button type="button" class="btn btn-primary btn-sm" onclick="submitEditCustomChemical(${index})">Confirm</button>
                    </div>
                    <div class="selected-chemicals" id="edit_selectedChemicals_${index}"></div>
                </div>
                <div class="form-group">
                    <label>Copy from Field</label>
                    <select id="edit_copyFrom_${index}" onchange="copyFieldChemicals(${index}, this.value)" style="margin-top: 4px;">
                        <option value="">Copy from field</option>
                        ${Array.from({length: index}, (_, i) => `<option value="${i}">Field ${i + 1}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>GPA</label>
                    <input type="text" id="edit_gpa_${index}" value="" placeholder="e.g., 15">
                </div>
                <div class="form-group">
                    <label>Optimal Date</label>
                    <input type="text" id="edit_optimalDate_${index}" value="" placeholder="Click to select date" readonly onclick="openEditFieldCalendar(${index})">
                </div>
            </div>
        </div>
    `;

    const container = document.getElementById('editFieldGroups');
    container.insertAdjacentHTML('beforeend', html);

    // Initialize window arrays for this field
    window[`editSelectedChemicals_${index}`] = [];
    window[`editChemicalRates_${index}`] = [];
    window[`editChemicalRateUnits_${index}`] = [];

    // Scroll to the new field
    const newField = document.getElementById(`edit_fieldName_${index}`);
    if (newField) newField.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Remove field group from edit job modal
function removeEditFieldGroup(index) {
    // Don't allow removing the first field (index 0)
    if (index === 0) return;
    
    const fieldGroup = document.getElementById(`edit_fieldName_${index}`)?.closest('.edit-field-group');
    if (!fieldGroup) return;
    
    fieldGroup.remove();
    
    // Reindex all remaining fields
    const fieldGroups = document.querySelectorAll('#editFieldGroups .edit-field-group');
    window.editFieldCount = fieldGroups.length;
    
    fieldGroups.forEach((group, newIndex) => {
        // Update field number in header
        const headerDiv = group.querySelector('.edit-field-header');
        if (headerDiv) {
            const h4 = headerDiv.querySelector('h4');
            if (h4) h4.textContent = `Field ${newIndex + 1}`;
            
            // Update remove button
            const removeBtn = headerDiv.querySelector('.remove-field-btn');
            if (removeBtn) {
                // Hide remove button for first field
                if (newIndex === 0) {
                    removeBtn.remove();
                } else {
                    removeBtn.setAttribute('onclick', `removeEditFieldGroup(${newIndex})`);
                }
            }
        }
        
        // Update all element IDs to match new index
        const elements = group.querySelectorAll('[id]');
        elements.forEach(el => {
            const oldId = el.id;
            const newId = oldId.replace(/_\d+(?=[^_]*$)/, `_${newIndex}`);
            if (newId !== oldId) {
                el.id = newId;
                
                // Update associated labels
                const label = document.querySelector(`label[for="${oldId}"]`);
                if (label) {
                    label.setAttribute('for', newId);
                }
            }
        });
    });
}

// Close edit job modal
function closeEditJobModal() {
    document.getElementById('editJobModal').classList.remove('active');
}

// Close modals when clicking outside content area
document.addEventListener('click', function(e) {
    const appModal = document.getElementById('applicationDetailModal');
    if (appModal && appModal.classList.contains('active') && e.target === appModal) {
        closeApplicationModal();
    }
    const editModal = document.getElementById('editJobModal');
    if (editModal && editModal.classList.contains('active') && e.target === editModal) {
        closeEditJobModal();
    }
});

// Save edited job
async function saveEditedJob() {
    const jobId = currentApplicationId;
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Collect form data
    const updatedJob = {
        fullName: document.getElementById('edit_fullName').value,
        phone: document.getElementById('edit_phone').value,
        email: document.getElementById('edit_email').value,
        scheduledDate: document.getElementById('edit_scheduledDate').value,
        contactMethod: Array.from(document.querySelectorAll('input[name="edit_contactMethod"]:checked')).map(cb => cb.value).join(', '),
        address: document.getElementById('edit_address').value,
        city: document.getElementById('edit_city').value,
        state: document.getElementById('edit_state').value,
        zip: document.getElementById('edit_zip').value,
        message: document.getElementById('edit_message').value,
        fields: []
    };
    
    // Update fields — iterate DOM field groups (includes dynamically added fields)
    const fieldGroups = document.querySelectorAll('#editFieldGroups .edit-field-group');
    fieldGroups.forEach((group, index) => {
        const chemicals = window[`editSelectedChemicals_${index}`] || [];
        const chemicalRates = window[`editChemicalRates_${index}`] || [];
        const chemicalRateUnits = window[`editChemicalRateUnits_${index}`] || [];
        updatedJob.fields.push({
            fieldName: document.getElementById(`edit_fieldName_${index}`).value,
            fieldSize: document.getElementById(`edit_fieldSize_${index}`).value,
            cropType: document.getElementById(`edit_cropType_${index}`).value,
            fieldLocation: document.getElementById(`edit_fieldLocation_${index}`).value,
            gpa: document.getElementById(`edit_gpa_${index}`).value,
            chemicals: chemicals,
            chemicalRates: chemicalRates,
            chemicalRateUnits: chemicalRateUnits,
            optimalDate: document.getElementById(`edit_optimalDate_${index}`).value
        });
    });
    
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedJob)
        });
        
        if (response.ok) {
            // Update local data
            Object.assign(job, updatedJob);
            closeEditJobModal();
            fetchJobs();
        } else {
            alert('Error saving job. Please try again.');
        }
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Error saving job. Please try again.');
    }
}

// Chemical selector functions for edit modal
function filterEditChemicals(fieldIndex) {
    const searchInput = document.getElementById(`edit_chemicalSearch_${fieldIndex}`);
    const optionsContainer = document.getElementById(`edit_chemicalOptions_${fieldIndex}`);
    const searchTerm = searchInput.value.toLowerCase();
    
    let html = '<div class="chemical-option" onclick="selectEditChemical(' + fieldIndex + ', \'Other\')">Other</div>';
    
    const filtered = chemicalsDB.filter(chem => {
        const chemName = `${chem.brandName || ''} ${chem.chemName || ''}`.trim().toLowerCase();
        const category = chem.category ? chem.category.toLowerCase() : '';
        return chemName.includes(searchTerm) || category.includes(searchTerm);
    });
    
    const grouped = {};
    filtered.forEach(chem => {
        const type = chem.category ? chem.category.charAt(0).toUpperCase() + chem.category.slice(1) : 'Other';
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(chem);
    });
    
    Object.keys(grouped).sort().forEach(type => {
        html += '<div class="chemical-type-header">' + type + '</div>';
        grouped[type].forEach(chem => {
            const displayName = `${chem.brandName || ''} ${chem.chemName || ''}`.trim();
            html += '<div class="chemical-option" onclick="selectEditChemical(' + fieldIndex + ', \'' + displayName.replace(/'/g, "\\'") + '\')">' + displayName + '</div>';
        });
    });
    
    if (filtered.length === 0 && searchTerm.length > 0) {
        html += '<div class="chemical-no-results">No chemicals found</div>';
    }
    
    optionsContainer.innerHTML = html;
}

function showEditChemicalDropdown(fieldIndex) {
    const dropdown = document.getElementById(`edit_chemicalDropdown_${fieldIndex}`);
    dropdown.classList.add('active');
    filterEditChemicals(fieldIndex);
}

function hideEditChemicalDropdown(fieldIndex) {
    const dropdown = document.getElementById(`edit_chemicalDropdown_${fieldIndex}`);
    dropdown.classList.remove('active');
}

// Global handler to close dropdowns when clicking outside
let editDropdownHandler = null;
document.addEventListener('click', function(e) {
    // Close dropdown if clicking outside the selector and dropdown
    const selectors = document.querySelectorAll('.edit-job-form .chemical-selector');
    const dropdowns = document.querySelectorAll('.edit-job-form .chemical-dropdown');
    
    let clickedInside = false;
    selectors.forEach(function(sel) {
        if (sel.contains(e.target)) clickedInside = true;
    });
    dropdowns.forEach(function(dd) {
        if (dd.contains(e.target)) clickedInside = true;
    });
    
    if (!clickedInside) {
        dropdowns.forEach(function(dd) {
            dd.classList.remove('active');
        });
    }
});

function selectEditChemical(fieldIndex, chemicalName) {
    const searchInput = document.getElementById(`edit_chemicalSearch_${fieldIndex}`);
    const customChemInput = document.getElementById(`edit_customChemical_${fieldIndex}`);
    
    if (chemicalName === 'Other') {
        searchInput.value = '';
        customChemInput.style.display = 'flex';
        customChemInput.querySelector('input').focus();
    } else {
        searchInput.value = chemicalName;
        customChemInput.style.display = 'none';
        customChemInput.querySelector('input').value = '';
    }
    hideEditChemicalDropdown(fieldIndex);
}

function addEditChemical(fieldIndex) {
    const searchInput = document.getElementById(`edit_chemicalSearch_${fieldIndex}`);
    const chemicalName = searchInput.value.trim();
    const customChemInput = document.getElementById(`edit_customChemical_${fieldIndex}`);
    
    if (!chemicalName) return;
    
    // Initialize selected chemicals array for this field
    if (!window[`editSelectedChemicals_${fieldIndex}`]) {
        window[`editSelectedChemicals_${fieldIndex}`] = [];
    }
    if (!window[`editChemicalRates_${fieldIndex}`]) {
        window[`editChemicalRates_${fieldIndex}`] = [];
    }
    if (!window[`editChemicalRateUnits_${fieldIndex}`]) {
        window[`editChemicalRateUnits_${fieldIndex}`] = [];
    }
    
    const selectedChems = window[`editSelectedChemicals_${fieldIndex}`];
    
    // Check if already added
    if (selectedChems.includes(chemicalName)) {
        searchInput.value = '';
        return;
    }
    
    selectedChems.push(chemicalName);
    window[`editChemicalRates_${fieldIndex}`].push('');
    window[`editChemicalRateUnits_${fieldIndex}`].push('fl oz');
    renderEditSelectedChemicals(fieldIndex);
    searchInput.value = '';
    customChemInput.style.display = 'none';
}

function submitEditCustomChemical(fieldIndex) {
    const customInput = document.getElementById(`edit_customChemical_${fieldIndex}`).querySelector('input');
    const chemicalName = customInput.value.trim();
    
    if (!chemicalName) return;
    
    // Initialize selected chemicals array for this field
    if (!window[`editSelectedChemicals_${fieldIndex}`]) {
        window[`editSelectedChemicals_${fieldIndex}`] = [];
    }
    if (!window[`editChemicalRates_${fieldIndex}`]) {
        window[`editChemicalRates_${fieldIndex}`] = [];
    }
    if (!window[`editChemicalRateUnits_${fieldIndex}`]) {
        window[`editChemicalRateUnits_${fieldIndex}`] = [];
    }
    
    const selectedChems = window[`editSelectedChemicals_${fieldIndex}`];
    
    // Check if already added
    if (selectedChems.includes(chemicalName)) {
        customInput.value = '';
        return;
    }
    
    selectedChems.push(chemicalName);
    window[`editChemicalRates_${fieldIndex}`].push('');
    window[`editChemicalRateUnits_${fieldIndex}`].push('fl oz');
    renderEditSelectedChemicals(fieldIndex);
    customInput.value = '';
    document.getElementById(`edit_customChemical_${fieldIndex}`).style.display = 'none';
}

function removeEditChemical(fieldIndex, chemicalName) {
    if (!window[`editSelectedChemicals_${fieldIndex}`]) return;
    
    const idx = window[`editSelectedChemicals_${fieldIndex}`].indexOf(chemicalName);
    if (idx === -1) return;
    
    window[`editSelectedChemicals_${fieldIndex}`].splice(idx, 1);
    if (window[`editChemicalRates_${fieldIndex}`]) {
        window[`editChemicalRates_${fieldIndex}`].splice(idx, 1);
    }
    if (window[`editChemicalRateUnits_${fieldIndex}`]) {
        window[`editChemicalRateUnits_${fieldIndex}`].splice(idx, 1);
    }
    renderEditSelectedChemicals(fieldIndex);
}

function renderEditSelectedChemicals(fieldIndex) {
    const container = document.getElementById(`edit_selectedChemicals_${fieldIndex}`);
    const chemicals = window[`editSelectedChemicals_${fieldIndex}`] || [];
    const rates = window[`editChemicalRates_${fieldIndex}`] || [];
    const units = window[`editChemicalRateUnits_${fieldIndex}`] || [];
    
    container.innerHTML = chemicals.map((chem, ci) => {
        const chemical = chemicalsDB.find(c => {
            const displayName = `${c.brandName || ''} ${c.chemName || ''}`.trim();
            return displayName === chem;
        });
        const type = chemical && chemical.category ? chemical.category.charAt(0).toUpperCase() + chemical.category.slice(1) : '';
        const rateVal = rates[ci] || '';
        const unitVal = units[ci] || 'fl oz';
        return '<div class="chemical-rate-row">' +
            '<span class="chemical-tag" data-type="' + type + '">' + chem +
                '<button type="button" onclick="removeEditChemical(' + fieldIndex + ', \'' + chem.replace(/'/g, "\\'") + '\')">&times;</button>' +
            '</span>' +
            '<span class="chem-rate-sep">@</span>' +
            '<input type="text" class="chem-rate-input" value="' + rateVal.replace(/"/g, '&quot;') + '" placeholder="rate" oninput="editChemicalRateChanged(' + fieldIndex + ', ' + ci + ', this.value)">' +
            '<select class="chem-rate-unit" onchange="editChemicalRateUnitChanged(' + fieldIndex + ', ' + ci + ', this.value)">' +
                '<option value="fl oz"' + (unitVal === 'fl oz' ? ' selected' : '') + '>fl oz/acre</option>' +
                '<option value="oz"' + (unitVal === 'oz' ? ' selected' : '') + '>oz/acre</option>' +
                '<option value="pt"' + (unitVal === 'pt' ? ' selected' : '') + '>pt/acre</option>' +
                '<option value="qt"' + (unitVal === 'qt' ? ' selected' : '') + '>qt/acre</option>' +
                '<option value="gal"' + (unitVal === 'gal' ? ' selected' : '') + '>gal/acre</option>' +
                '<option value="lb"' + (unitVal === 'lb' ? ' selected' : '') + '>lb/acre</option>' +
                '<option value="vv"' + (unitVal === 'vv' ? ' selected' : '') + '>% v/v</option>' +
            '</select>' +
        '</div>';
    }).join('');
}

// Edit modal chemical rate change handlers
function editChemicalRateChanged(fieldIndex, chemIndex, value) {
    if (!window[`editChemicalRates_${fieldIndex}`]) {
        const chemicals = window[`editSelectedChemicals_${fieldIndex}`] || [];
        window[`editChemicalRates_${fieldIndex}`] = chemicals.map(() => '');
    }
    window[`editChemicalRates_${fieldIndex}`][chemIndex] = value;
}

function editChemicalRateUnitChanged(fieldIndex, chemIndex, value) {
    if (!window[`editChemicalRateUnits_${fieldIndex}`]) {
        const chemicals = window[`editSelectedChemicals_${fieldIndex}`] || [];
        window[`editChemicalRateUnits_${fieldIndex}`] = chemicals.map(() => 'fl oz');
    }
    window[`editChemicalRateUnits_${fieldIndex}`][chemIndex] = value;
}

// Initialize selected chemicals when opening edit modal
function initializeEditChemicals(job, fieldIndex) {
    const field = job.fields[fieldIndex];
    if (field && field.chemicals) {
        window[`editSelectedChemicals_${fieldIndex}`] = [...field.chemicals];
        renderEditSelectedChemicals(fieldIndex);
    } else {
        window[`editSelectedChemicals_${fieldIndex}`] = [];
        renderEditSelectedChemicals(fieldIndex);
    }
}

// Copy chemicals from one field to another in edit modal
function copyFieldChemicals(targetIndex, sourceIndex) {
    sourceIndex = parseInt(sourceIndex);
    if (isNaN(sourceIndex) || sourceIndex < 0) return;
    
    // Get source chemicals, rates, units
    const sourceChemicals = window[`editSelectedChemicals_${sourceIndex}`] || [];
    const sourceRates = window[`editChemicalRates_${sourceIndex}`] || [];
    const sourceUnits = window[`editChemicalRateUnits_${sourceIndex}`] || [];
    
    if (sourceChemicals.length === 0) return;
    
    // Clear target arrays and copy from source
    window[`editSelectedChemicals_${targetIndex}`] = [...sourceChemicals];
    window[`editChemicalRates_${targetIndex}`] = [...sourceRates];
    window[`editChemicalRateUnits_${targetIndex}`] = [...sourceUnits];
    
    // Re-render target chemical tags
    renderEditSelectedChemicals(targetIndex);
    
    // Reset dropdown selection
    const select = document.getElementById(`edit_copyFrom_${targetIndex}`);
    if (select) select.value = '';
}

// Open calendar for scheduled date in edit modal
function openScheduledCalendar() {
    const input = document.getElementById('edit_scheduledDate');
    const currentDate = input.value;
    
    // Simple date picker prompt
    const dateStr = prompt('Enter scheduled date (YYYY-MM-DD):', currentDate || new Date().toISOString().split('T')[0]);
    if (dateStr) {
        input.value = dateStr;
    }
}

// Open calendar for field optimal date in edit modal
function openEditFieldCalendar(fieldIndex) {
    const input = document.getElementById(`edit_optimalDate_${fieldIndex}`);
    const currentDate = input.value;
    
    // Simple date picker prompt
    const dateStr = prompt('Enter optimal date (YYYY-MM-DD):', currentDate || new Date().toISOString().split('T')[0]);
    if (dateStr) {
        input.value = dateStr;
    }
}

// Open map for field location in edit modal
let editFieldMapIndex = null;
let editFieldMap = null;
let editFieldMarker = null;
let editFieldMapInitialized = false;

function openEditFieldMap(fieldIndex) {
    editFieldMapIndex = fieldIndex;
    document.getElementById('fieldMapModal').classList.add('active');
    
    // Set map title based on context
    const modalTitle = document.querySelector('#fieldMapModal .map-modal-header h3');
    if (modalTitle) modalTitle.textContent = 'Locate Your Field';
    
    if (!editFieldMapInitialized) {
        initEditFieldMap();
    }
    
    // Parse existing coordinates and set marker if present
    const locationInput = document.getElementById(`edit_fieldLocation_${fieldIndex}`);
    const existingCoords = locationInput.value;
    
    if (existingCoords && existingCoords.includes(',')) {
        const parts = existingCoords.split(',');
        if (parts.length === 2) {
            const lat = parseFloat(parts[0].trim());
            const lng = parseFloat(parts[1].trim());
            if (!isNaN(lat) && !isNaN(lng)) {
                // Clear existing marker
                if (editFieldMarker) {
                    editFieldMap.removeLayer(editFieldMarker);
                }
                // Add marker at existing location
                editFieldMarker = L.marker([lat, lng], { draggable: true }).addTo(editFieldMap);
                
                // Set view to existing location
                editFieldMap.setView([lat, lng], 15);
                
                // Update coords when marker is dragged
                editFieldMarker.on('dragend', function(e) {
                    // Coordinates updated silently
                });
            }
        }
    } else {
        // Reset to default view if no existing coords
        editFieldMap.setView([42.2975, -89.6438], 10);
    }
    
    // Invalidate map size when modal opens
    setTimeout(() => editFieldMap.invalidateSize(), 100);
}



function initEditFieldMap() {
    // Center on Northern Illinois (Freeport area)
    editFieldMap = L.map('fieldMapView').setView([42.2975, -89.6438], 10);

    // ESRI World Imagery (satellite)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    }).addTo(editFieldMap);

    // ESRI World Boundaries and Places (labels overlay)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Labels &copy; Esri',
        maxZoom: 18
    }).addTo(editFieldMap);

    // ESRI World Transportation (roads overlay)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Roads &copy; Esri',
        maxZoom: 18
    }).addTo(editFieldMap);

    // Click to place pin
    editFieldMap.on('click', function(e) {
        if (editFieldMarker) {
            editFieldMap.removeLayer(editFieldMarker);
        }
        editFieldMarker = L.marker(e.latlng, {
            draggable: true
        }).addTo(editFieldMap);

        // Update coords when marker is dragged
        editFieldMarker.on('dragend', function(ev) {
            // Coordinates updated silently
        });
    });

    editFieldMapInitialized = true;
}

function clearEditFieldPin() {
    if (editFieldMarker) {
        editFieldMap.removeLayer(editFieldMarker);
        editFieldMarker = null;
    }
}

function getEditFieldCoordinates() {
    if (!editFieldMarker) {
        alert('Please click on the map to place a pin first.');
        return;
    }
    const latlng = editFieldMarker.getLatLng();
    const lat = latlng.lat.toFixed(6);
    const lng = latlng.lng.toFixed(6);
    document.getElementById(`edit_fieldLocation_${editFieldMapIndex}`).value = `${lat}, ${lng}`;
    closeFieldMapModal();
}

function openFieldAppleMaps() {
    var marker = editFieldMarker || fieldMarker;
    if (!marker) {
        alert('Please click on the map to place a pin first.');
        return;
    }
    var latlng = marker.getLatLng();
    var lat = latlng.lat.toFixed(6);
    var lng = latlng.lng.toFixed(6);
    window.open('https://maps.apple.com/?ll=' + lat + ',' + lng + '&q=' + lat + ',' + lng, '_blank');
}

// Update jobs stats
function updateAcresStats() {
    const currentYear = new Date().getFullYear();
    let allCompletedAcres = 0;
    let thisYearCompletedAcres = 0;
    
    jobs.forEach(job => {
        if (!job.fields || !job.fieldStatus || !job.fieldCompletionDates) return;
        job.fields.forEach((field, index) => {
            if (job.fieldStatus[index] === 'complete') {
                const acres = parseInt(field.fieldSize) || 0;
                allCompletedAcres += acres;
                const completionDate = job.fieldCompletionDates[index];
                if (completionDate) {
                    const completionYear = new Date(completionDate).getFullYear();
                    if (completionYear === currentYear) {
                        thisYearCompletedAcres += acres;
                    }
                }
            }
        });
    });
    
    const groTechEl = document.getElementById('overviewGroTechAcres');
    const yearEl = document.getElementById('overviewYearAcres');
    if (groTechEl) groTechEl.textContent = (ACRES_BASELINE + allCompletedAcres).toLocaleString();
    if (yearEl) yearEl.textContent = thisYearCompletedAcres.toLocaleString();
}

function updateJobsStats() {
    const totalJobs = jobs.length;
    const pendingJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus, j.scheduledDate);
        return status === 'pending';
    }).length;
    const scheduledJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus, j.scheduledDate);
        return status === 'scheduled' || status === 'in_progress';
    }).length;
    const completedJobs = jobs.filter(j => {
        const status = calculateJobStatus(j.jobStatus, j.fieldStatus, j.scheduledDate);
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
    
    updateAcresStats();
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
    { key: 'category', label: 'Category', type: 'select', options: ['Herbicide', 'Insecticide', 'Fungicide', 'Adjuvant'] },
    { key: 'rateRange', label: 'Rate Range', type: 'text' },
    { key: 'rateUnit', label: 'Rate Unit', type: 'select', options: ['fl oz/acre', 'oz/acre', 'pt/acre', 'qt/acre', 'gal/acre', 'lb/acre', '% v/v'] },
    { key: 'verified', label: 'Verified', type: 'verified' }
];

async function initChemicalListPage() {
    try {
        const response = await fetch(`${API_BASE_URL}/chemicals`);
        const data = await response.json();
        
        // Load columns from API
        if (data.columns && data.columns.length > 0) {
            chemicalColumns = data.columns;
            // Ensure rateUnit has all required options including % v/v
            const rateUnitCol = chemicalColumns.find(c => c.key === 'rateUnit');
            if (rateUnitCol && rateUnitCol.options) {
                if (!rateUnitCol.options.includes('% v/v')) {
                    rateUnitCol.options = ['fl oz/acre', 'oz/acre', 'pt/acre', 'qt/acre', 'gal/acre', 'lb/acre', '% v/v'];
                }
            }
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
            if (col.key === 'rateUnit') {
                newChem[col.key] = 'fl oz/acre';
            } else {
                newChem[col.key] = '';
            }
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
            buildChemicalDropdownOptions();
            
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

// Initial render on page load
document.getElementById('contentArea').innerHTML = pages.overview.content;

// Fetch data after content is rendered
fetchApplications();
fetchJobs();

// Chemical Calculator Functions
let chemicalRowCount = 1;
let chemicalsDB = []; // Chemical database from API

// Fetch chemicals from API on page load
async function fetchChemicalsForCalculator() {
    try {
        const response = await fetch(`${API_BASE_URL}/chemicals`);
        const data = await response.json();
        chemicalsDB = data.chemicals || [];
        buildChemicalDropdownOptions();
    } catch (error) {
        console.error('Error fetching chemicals:', error);
        chemicalsDB = getDefaultChemicals();
        buildChemicalDropdownOptions();
    }
}

function getDefaultChemicals() {
    return [
        { id: 1, brandName: 'BASF', chemName: 'Veltyma', category: 'Fungicide' },
        { id: 2, brandName: 'Syngenta', chemName: 'Miravis Neo', category: 'Fungicide' },
        { id: 3, brandName: 'Corteva', chemName: 'LumiAlive', category: 'Fungicide' },
        { id: 4, brandName: 'FMC', chemName: 'Authority MTZ', category: 'Herbicide' },
        { id: 5, brandName: 'BASF', chemName: 'Zidua SC', category: 'Herbicide' },
        { id: 6, brandName: 'Corteva', chemName: 'Enlist Duo', category: 'Herbicide' },
        { id: 7, brandName: 'Bayer', chemName: 'Silwet', category: 'Surfactant' },
        { id: 8, brandName: 'WinField', chemName: 'Rank', category: 'Adjuvant' },
        { id: 9, brandName: 'BASF', chemName: 'Engage', category: 'Adjuvant' },
        { id: 10, brandName: 'Syngenta', chemName: 'Fortenza', category: 'Insecticide' }
    ];
}

// Build dropdown options for all search inputs
function buildChemicalDropdownOptions() {
    const dropdowns = document.querySelectorAll('.chemical-dropdown');
    if (dropdowns.length === 0) return;
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = chemicalsDB.map(chem => {
            const displayName = `${chem.brandName || ''} ${chem.chemName || ''}`.trim();
            return `<div class="dropdown-item" data-id="${chem.id}" data-name="${displayName}">${displayName}</div>`;
        }).join('');
    });
}

// Show dropdown when focusing on search input
function showChemicalDropdown(input) {
    const wrapper = input.closest('.chemical-search-wrapper');
    const dropdown = wrapper.querySelector('.chemical-dropdown');
    const searchTerm = input.value.toLowerCase();
    
    // Filter and show matching items
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(searchTerm) ? 'block' : 'none';
    });
    
    dropdown.style.display = 'block';
}

// Handle chemical search input
function onChemicalSearch(input) {
    const wrapper = input.closest('.chemical-search-wrapper');
    const dropdown = wrapper.querySelector('.chemical-dropdown');
    const searchTerm = input.value.toLowerCase();
    
    // Filter dropdown items
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(searchTerm) ? 'block' : 'none';
    });
}

// Select chemical from dropdown
function selectChemicalFromDropdown(event) {
    const item = event.target.closest('.dropdown-item');
    if (!item) return;
    
    const wrapper = item.closest('.chemical-search-wrapper');
    const input = wrapper.querySelector('.chemical-search-input');
    const dropdown = wrapper.querySelector('.chemical-dropdown');
    const customInput = wrapper.querySelector('.custom-chem-name');
    const row = wrapper.closest('.chemical-row');
    const labelRateInput = row.querySelector('.label-rate');
    
    const chemId = item.dataset.id;
    const chemName = item.dataset.name;
    
    input.value = chemName;
    input.dataset.selectedId = chemId;
    dropdown.style.display = 'none';
    customInput.style.display = 'none';
    
    // Auto-fill rate range and unit
    const chem = chemicalsDB.find(c => c.id === chemId);
    if (chem) {
        if (chem.rateRange) {
            labelRateInput.value = chem.rateRange;
        }
        if (chem.rateUnit) {
            let unitValue = chem.rateUnit.replace('/acre', '');
            if (unitValue === '% v/v') {
                unitValue = 'vv';
            }
            row.querySelector('.rate-unit').value = unitValue;
        }
    }
    
    calculateChemicalVolume(labelRateInput);
}

// Handle chemical selection - auto-fill rate and unit
function onChemicalSelect(selectElement) {
    const row = selectElement.closest('.chemical-row');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const customInput = row.querySelector('.custom-chem-name');
    const labelRateInput = row.querySelector('.label-rate');
    
    if (selectElement.value === 'custom') {
        customInput.style.display = 'block';
        labelRateInput.value = '';
        labelRateInput.readOnly = false;
    } else {
        customInput.style.display = 'none';
        
        // Auto-fill rate range and unit from chemical data
        const chem = chemicalsDB.find(c => c.id === selectElement.value);
        
        if (chem) {
            // Set rate range
            if (chem.rateRange) {
                labelRateInput.value = chem.rateRange;
            }
            // Set rate unit
            if (chem.rateUnit) {
                let unitValue = chem.rateUnit.replace('/acre', '');
                if (unitValue === '% v/v') {
                    unitValue = 'vv';
                }
                row.querySelector('.rate-unit').value = unitValue;
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
    
    // Calculate chemical volume
    const rateUnit = row.querySelector('.rate-unit').value;
    const fieldSize = parseFloat(document.getElementById('fieldSize').value) || 0;
    const gpa = parseFloat(document.getElementById('fieldGPA').value) || 0;
    const totalVolume = fieldSize * gpa;
    
    // Check if label rate is a range (contains " - ")
    const isRange = labelRateValue.includes(' - ');
    
    if (rateUnit === 'vv') {
        // v/v calculation: chemical_volume = total_volume * (percentage / 100)
        if (isRange) {
            const parts = labelRateValue.split(' - ');
            const minPercent = parseFloat(parts[0]) || 0;
            const maxPercent = parseFloat(parts[1]) || 0;
            
            if (minPercent > 0 && totalVolume > 0) {
                const minVolume = totalVolume * (minPercent / 100);
                const maxVolume = totalVolume * (maxPercent / 100);
                row.querySelector('.chemical-volume').value = `${minVolume.toFixed(2)} - ${maxVolume.toFixed(2)} gal`;
                row.querySelector('.chemical-volume').dataset.minVolume = minVolume;
                row.querySelector('.chemical-volume').dataset.maxVolume = maxVolume;
            } else {
                row.querySelector('.chemical-volume').value = '';
                row.querySelector('.chemical-volume').dataset.minVolume = '';
                row.querySelector('.chemical-volume').dataset.maxVolume = '';
            }
        } else {
            const labelRate = parseFloat(labelRateValue) || 0;
            
            if (labelRate > 0 && totalVolume > 0) {
                const chemVolume = totalVolume * (labelRate / 100);
                row.querySelector('.chemical-volume').value = chemVolume.toFixed(2) + ' gal';
                row.querySelector('.chemical-volume').dataset.minVolume = '';
                row.querySelector('.chemical-volume').dataset.maxVolume = '';
            } else {
                row.querySelector('.chemical-volume').value = '';
                row.querySelector('.chemical-volume').dataset.minVolume = '';
                row.querySelector('.chemical-volume').dataset.maxVolume = '';
            }
        }
    } else {
        // Standard rate unit calculation
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
            <div class="chemical-search-wrapper">
                <input type="text" class="chemical-search-input" placeholder="Search or select chemical..." oninput="onChemicalSearch(this)" onfocus="showChemicalDropdown(this)" data-selected-id="">
                <input type="text" class="custom-chem-name" placeholder="Custom name" style="display:none; margin-top: 4px;">
                <div class="chemical-dropdown" onclick="selectChemicalFromDropdown(event)"></div>
            </div>
        </td>
        <td><input type="text" class="label-rate" placeholder="32 or 16 - 64" oninput="calculateChemicalVolume(this)"></td>
        <td>
            <select class="rate-unit" onchange="calculateChemicalVolume(this)">
                <option value="fl oz" selected>fl oz/acre</option>
                <option value="oz">oz/acre</option>
                <option value="pt">pt/acre</option>
                <option value="qt">qt/acre</option>
                <option value="gal">gal/acre</option>
                <option value="lb">lb/acre</option>
                <option value="vv">% v/v</option>
            </select>
        </td>
        <td><input type="text" class="chemical-volume" readonly placeholder="-" style="background: var(--border-light);"></td>
        <td><button class="remove-chem-btn" onclick="removeChemicalRow(this)" title="Remove">&times;</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Build dropdown options for all search inputs
    buildChemicalDropdownOptions();
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
        firstRow.querySelector('.chemical-search-input').value = '';
        firstRow.querySelector('.label-rate').value = '';
        firstRow.querySelector('.rate-unit').value = 'fl oz';
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

// Find chemical match with prioritized matching
// Priority: 1. Exact (brand + chem), 2. Brand match, 3. Chem name match
function findChemicalMatch(appChemName) {
    const searchName = appChemName.toLowerCase();
    
    // 1. Try exact match (both brand and chem name in database)
    let exactMatch = chemicalsDB.find(c => {
        const brandMatch = c.brandName && searchName.includes(c.brandName.toLowerCase());
        const chemMatch = c.chemName && searchName.includes(c.chemName.toLowerCase());
        return brandMatch && chemMatch;
    });
    if (exactMatch) return exactMatch;
    
    // 2. Try brand name match only
    let brandMatch = chemicalsDB.find(c => 
        c.brandName && searchName.includes(c.brandName.toLowerCase())
    );
    if (brandMatch) return brandMatch;
    
    // 3. Try chemical name match only
    let chemMatch = chemicalsDB.find(c => 
        c.chemName && searchName.includes(c.chemName.toLowerCase())
    );
    if (chemMatch) return chemMatch;
    
    return null; // No match found
}

// Fill chemicals in calculator after data is loaded
function fillChemicalsInCalculator(chemicals) {
    const tbody = document.getElementById('fieldChemicalsBody');
    
    chemicals.forEach((chemName, index) => {
        const chem = findChemicalMatch(chemName);
        
        if (index === 0) {
            // Use first row
            const firstRow = tbody.querySelector('.chemical-row');
            const input = firstRow.querySelector('.chemical-search-input');
            const customInput = firstRow.querySelector('.custom-chem-name');
            
            if (chem) {
                // Match found - use database values
                const displayName = `${chem.brandName || ''} ${chem.chemName || ''}`.trim();
                input.value = displayName;
                input.dataset.selectedId = chem.id;
                customInput.style.display = 'none';
                onChemicalSearch(input);
                
                // Auto-fill rate
                const labelRateInput = firstRow.querySelector('.label-rate');
                if (chem.rateRange) {
                    labelRateInput.value = chem.rateRange;
                }
                if (chem.rateUnit) {
                    let unitValue = chem.rateUnit.replace('/acre', '');
                    if (unitValue === '% v/v') {
                        unitValue = 'vv';
                    }
                    firstRow.querySelector('.rate-unit').value = unitValue;
                }
                calculateChemicalVolume(labelRateInput);
            } else {
                // No match - add as custom
                input.value = chemName;
                input.dataset.selectedId = '';
                customInput.style.display = 'none';
            }
        } else {
            // Add new row for additional chemicals
            addChemicalRow();
            const rows = tbody.querySelectorAll('.chemical-row');
            const newRow = rows[rows.length - 1];
            const input = newRow.querySelector('.chemical-search-input');
            const customInput = newRow.querySelector('.custom-chem-name');
            
            setTimeout(() => {
                if (chem) {
                    // Match found - use database values
                    const displayName = `${chem.brandName || ''} ${chem.chemName || ''}`.trim();
                    input.value = displayName;
                    input.dataset.selectedId = chem.id;
                    customInput.style.display = 'none';
                    
                    // Auto-fill rate
                    const labelRateInput = newRow.querySelector('.label-rate');
                    if (chem.rateRange) {
                        labelRateInput.value = chem.rateRange;
                    }
                    if (chem.rateUnit) {
                        let unitValue = chem.rateUnit.replace('/acre', '');
                        if (unitValue === '% v/v') {
                            unitValue = 'vv';
                        }
                        newRow.querySelector('.rate-unit').value = unitValue;
                    }
                    calculateChemicalVolume(labelRateInput);
                } else {
                    // No match - add as custom
                    input.value = chemName;
                    input.dataset.selectedId = '';
                    customInput.style.display = 'none';
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
        const chemName = row.querySelector('.chemical-search-input').value || 'Unknown';
        
        const labelRate = row.querySelector('.label-rate').value;
        const rateUnit = row.querySelector('.rate-unit').value;
        const volumeInput = row.querySelector('.chemical-volume');
        const volumeValue = volumeInput.value;
        
        // Check if volume is a range using dataset or value
        const minVol = parseFloat(volumeInput.dataset.minVolume) || 0;
        const maxVol = parseFloat(volumeInput.dataset.maxVolume) || 0;
        const isRange = minVol > 0 && maxVol > 0 && minVol !== maxVol;
        
        let perTankDisplay = '-';
        
        if (chemName && tanksNeeded > 0) {
            var perTankValues = [];
            const tankRatio = Math.min(tankSize, totalVolume) / totalVolume;
            if (isRange) {
                perTankValues = [minVol * tankRatio, maxVol * tankRatio];
            } else {
                const fieldVolume = minVol || parseFloat(volumeValue) || 0;
                const perTank = fieldVolume * tankRatio;
                if (perTank > 0) {
                    perTankValues = [perTank];
                }
            }
            
            if (perTankValues.length > 0) {
                if (rateUnit === 'lb') {
                    var ozVals = perTankValues.map(function(v) { return v * 16; });
                    perTankDisplay = ozVals.length === 2
                        ? ozVals[0].toFixed(1) + ' - ' + ozVals[1].toFixed(1) + ' oz'
                        : ozVals[0].toFixed(1) + ' oz';
                } else if (rateUnit === 'oz') {
                    var ozVals = perTankValues.map(function(v) { return v * 128; });
                    perTankDisplay = ozVals.length === 2
                        ? ozVals[0].toFixed(1) + ' - ' + ozVals[1].toFixed(1) + ' oz'
                        : ozVals[0].toFixed(1) + ' oz';
                } else {
                    var ozVals = perTankValues.map(function(v) { return v * 128; });
                    perTankDisplay = ozVals.length === 2
                        ? ozVals[0].toFixed(1) + ' - ' + ozVals[1].toFixed(1) + ' fl oz'
                        : ozVals[0].toFixed(1) + ' fl oz';
                }
            }
        }
        
        if (chemName && labelRate) {
            hasChemicals = true;
            const rateUnitDisplay = rateUnit === 'vv' ? '% v/v' : rateUnit + '/acre';
            tableHtml += `
                <tr>
                    <td>${chemName}</td>
                    <td>${labelRate}</td>
                    <td>${rateUnitDisplay}</td>
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

// Close chemical dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.chemical-search-wrapper') && !e.target.closest('#editJobModal')) {
        document.querySelectorAll('.chemical-dropdown').forEach(dropdown => {
            if (!dropdown.closest('#editJobModal')) {
                dropdown.style.display = 'none';
            }
        });
    }
});