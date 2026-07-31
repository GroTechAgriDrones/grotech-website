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
                <h2 class="section-title">Upcoming Jobs</h2>
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Acres</th>
                                <th>Crop Type</th>
                                <th>Scheduled Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="upcomingJobsBody">
                            <tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">Loading upcoming jobs...</td></tr>
                        </tbody>
                    </table>
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
            <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
                <p>View and manage all application requests</p>
                <button class="btn btn-primary" onclick="openNewApplicationModal()" style="white-space: nowrap;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Application Request
                </button>
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
            <div class="farm-toolbar">
                <input type="text" id="farmSearch" class="farm-search" placeholder="Search by farm name or location...">
                <span class="farm-count" id="farmCount"></span>
            </div>
            <div class="profiles-grid farm-grid" id="farmProfilesGrid">
                <div class="no-data" style="grid-column: 1/-1; text-align: center; padding: 40px;">Loading farm profiles...</div>
            </div>
        `
    },
    reports: {
        title: 'Reports',
        content: `
            <div class="page-header">
                <p>View analytics and reports</p>
            </div>
            <div class="reports-toolbar">
                <div>
                    <h3 class="reports-toolbar-title">Season Analytics</h3>
                    <p class="reports-toolbar-sub">All figures computed from completed field records</p>
                </div>
                <select id="reportYear" class="reports-year-select" onchange="renderReportsPage()"></select>
            </div>
            <div class="reports-kpi-grid" id="reportsKpis"></div>
            <div class="reports-row">
                <div class="report-panel">
                    <h3>Acres Sprayed by Month</h3>
                    <div class="reports-bar-chart" id="reportsMonthChart"></div>
                </div>
                <div class="report-panel">
                    <h3>Crop Breakdown</h3>
                    <div class="reports-bars-list" id="reportsCropBars"></div>
                </div>
            </div>
            <div class="reports-row">
                <div class="report-panel">
                    <h3>Top Farms by Acres Sprayed</h3>
                    <table class="reports-table">
                        <thead><tr><th>#</th><th>Farm</th><th class="num">Jobs</th><th class="num">Acres</th></tr></thead>
                        <tbody id="reportsTopFarms"></tbody>
                    </table>
                </div>
                <div class="report-panel">
                    <h3>Recent Field Completions</h3>
                    <table class="reports-table">
                        <thead><tr><th>Job</th><th>Farm</th><th>Field</th><th class="num">Acres</th><th>Completed</th></tr></thead>
                        <tbody id="reportsRecent"></tbody>
                    </table>
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
                        await fetchWithTimeout(`${API_BASE_URL}/training`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(record)
                        });
                        form.reset();
                        dateEl.value = new Date().toISOString().split('T')[0];
                        topicsEl.value = '';
                        clearCache('training');
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
                        await fetchWithTimeout(`${API_BASE_URL}/maintenance`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(record)
                        });
                        form.reset();
                        document.getElementById('maintDate').value = new Date().toISOString().split('T')[0];
                        clearCache('maintenance');
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
    const cached = getCache('maintenance');
    if (cached) {
        maintenanceRecords = cached;
    } else {
        const container = document.getElementById('maintenanceRecordsContainer');
        if (container) container.innerHTML = '<div style="text-align:center;padding:40px;color:#6b7280;font-style:italic;">Loading...</div>';
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/maintenance`);
        if (response.ok) {
            const data = await response.json();
            maintenanceRecords = data.records || [];
            setCache('maintenance', maintenanceRecords);
        } else {
            console.error('Error fetching maintenance records:', response.status);
            if (!cached) maintenanceRecords = [];
        }
    } catch (err) {
        console.error('Error fetching maintenance records:', err);
        if (!cached) maintenanceRecords = [];
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
                await fetchWithTimeout(`${API_BASE_URL}/maintenance/${id}`, { method: 'DELETE' });
                clearCache('maintenance');
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
                await fetchWithTimeout(`${API_BASE_URL}/maintenance/${id}`, { method: 'DELETE' });
                clearCache('maintenance');
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
    const cached = getCache('training');
    if (cached) {
        trainingRecords = cached;
    } else {
        const container = document.getElementById('trainingRecordsContainer');
        if (container) container.innerHTML = '<div style="text-align:center;padding:40px;color:#6b7280;font-style:italic;">Loading...</div>';
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/training`);
        if (response.ok) {
            const data = await response.json();
            trainingRecords = data.records || [];
            setCache('training', trainingRecords);
        } else {
            console.error('Error fetching training records:', response.status);
            if (!cached) trainingRecords = [];
        }
    } catch (err) {
        console.error('Error fetching training records:', err);
        if (!cached) trainingRecords = [];
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
            await fetchWithTimeout(`${API_BASE_URL}/training/${record.id}`, { method: 'DELETE' });
            clearCache('training');
            await fetchTrainingRecords();
        } catch (err) {
            console.error('Error deleting record for edit:', err);
        }
        document.getElementById('trainingFormSection').scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('trainingDetailDeleteBtn').onclick = async function() {
        if (!confirm('Delete this training record? This cannot be undone.')) return;
        try {
            await fetchWithTimeout(`${API_BASE_URL}/training/${record.id}`, { method: 'DELETE' });
            clearCache('training');
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
                { gpa: 2, routeSpacing: 28, speed: 66, height: 11, droplet: 350 },
                { gpa: 3, routeSpacing: 28, speed: 66, height: 11, droplet: 350 }
            ],
            herbicide: [
                { gpa: 5, routeSpacing: 25, speed: 45, height: 11, droplet: 500 },
                { gpa: 3, routeSpacing: 25, speed: 45, height: 11, droplet: 500 }
            ],
            insecticide: [
                { gpa: 2, routeSpacing: 28, speed: 66, height: 11, droplet: 350 },
                { gpa: 3, routeSpacing: 28, speed: 66, height: 11, droplet: 350 }
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

        // Render farm profiles when page is loaded
        if (pageKey === 'profiles') {
            setTimeout(() => {
                renderFarmProfiles();
                const farmSearch = document.getElementById('farmSearch');
                if (farmSearch) farmSearch.oninput = renderFarmProfiles;
                fetchJobs();
            }, 100);
        }

        // Render reports when page is loaded
        if (pageKey === 'reports') {
            setTimeout(() => {
                renderReportsPage();
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/credentials`);
        if (!response.ok) {
            console.error('Error fetching account info:', response.status);
            return;
        }
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/credentials`, {
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
                        <td>${Math.round(totalAcres * 100) / 100} acres</td>
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

async function fetchWithTimeout(url, options = {}, timeout = 15000, retries = 1) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            if (res.ok || attempt >= retries) {
                return res;
            }
            if (res.status === 502 || res.status === 503 || res.status === 504) {
                await new Promise(r => setTimeout(r, 1000));
                continue;
            }
            return res;
        } catch (err) {
            clearTimeout(id);
            if (attempt < retries) {
                await new Promise(r => setTimeout(r, 1000));
                continue;
            }
            throw err;
        }
    }
}

const CACHE_PREFIX = 'gc_';

function getCache(key) {
    try {
        const item = JSON.parse(localStorage.getItem(CACHE_PREFIX + key));
        if (item) return item.data;
    } catch (e) {}
    return null;
}

function setCache(key, data) {
    try {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {}
}

function clearCache(key) {
    try { localStorage.removeItem(CACHE_PREFIX + key); } catch (e) {}
}

function loadingRow(colspan, msg) {
    return '<tr><td colspan="' + colspan + '" style="text-align:center;padding:30px;color:#6b7280;font-style:italic;">' + (msg || 'Loading...') + '</td></tr>';
}

let applications = [];
let currentApplicationId = null;

// Fetch all applications from API
async function fetchApplications() {
    const cached = getCache('applications');
    if (cached) {
        applications = cached;
        renderApplicationsTable();
        updateDashboardStats();
    } else {
        const tbody = document.getElementById('applicationsTableBody');
        if (tbody) tbody.innerHTML = loadingRow(8);
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/applications`);
        if (response.ok) {
            applications = await response.json();
            setCache('applications', applications);
            renderApplicationsTable();
            updateDashboardStats();
        } else {
            const errorText = await response.text();
            console.error('Error fetching applications:', response.status, errorText);
            if (!cached) {
                const tbody = document.getElementById('applicationsTableBody');
                if (tbody) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ef4444;">Error loading applications. Server returned ' + response.status + '. Please try again.</td></tr>';
            }
        }
    } catch (error) {
        console.error('Error fetching applications:', error);
        if (!cached) {
            const tbody = document.getElementById('applicationsTableBody');
            if (tbody) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ef4444;">Error loading applications. Check your connection and try again.</td></tr>';
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
                <td>${Math.round(totalAcres * 100) / 100} acres</td>
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
                                `<button class="calc-view-btn" onclick="event.stopPropagation(); openCalculatorWithField('${field.fieldSize}', ${JSON.stringify(field.chemicals).replace(/"/g, '&quot;')}, ${JSON.stringify(field.chemicalRates || []).replace(/"/g, '&quot;')}, ${JSON.stringify(field.chemicalRateUnits || []).replace(/"/g, '&quot;')})" title="Calculate in Chemical Calculator">
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
    if (editFieldMap) {
        editFieldMap.remove();
        editFieldMap = null;
        editFieldMapInitialized = false;
    }
}

// Search for a location on the field map
function searchFieldMapLocation() {
    const input = document.getElementById('mapSearchInput');
    const query = input.value.trim();
    if (!query) return;

    const map = editFieldMap;
    if (!map) return;

    // Check if input is GPS coordinates (two comma-separated numbers)
    const coordMatch = query.match(/^\s*([+-]?\d+\.?\d*)\s*,\s*([+-]?\d+\.?\d*)\s*$/);
    if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lng = parseFloat(coordMatch[2]);
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            map.setView([lat, lng], 15);
            if (editFieldMarker) map.removeLayer(editFieldMarker);
            editFieldMarker = L.marker([lat, lng], { draggable: true }).addTo(map);
            editFieldMarker.on('dragend', function() {});
            return;
        }
    }

    // Geocode via Nominatim
    const locLower = query.toLowerCase();
    const suffix = (locLower.includes('illinois') || locLower.includes('united states') || locLower.includes('usa')) ? '' : ', Illinois, USA';
    const url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(query + suffix) + '&format=json&limit=1';

    fetch(url)
        .then(function(r) {
            if (!r.ok) throw new Error('Geocode request failed');
            return r.json();
        })
        .then(function(data) {
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                map.setView([lat, lng], 15);
                if (editFieldMarker) map.removeLayer(editFieldMarker);
                editFieldMarker = L.marker([lat, lng], { draggable: true }).addTo(map);
                editFieldMarker.on('dragend', function() {});
            } else {
                alert('Location not found. Try a different search term.');
            }
        })
        .catch(function() {
            alert('Failed to search for location. Please try again.');
        });
}

// Update application status via API
async function updateApplicationStatus(status) {
    if (!currentApplicationId) return;
    
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/applications/${currentApplicationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Status updated:', result);
            clearCache('applications');
            await fetchApplications();
            closeApplicationModal();
        } else {
            const result = await response.json();
            alert('Error: ' + (result.error || 'Failed to update status'));
        }
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
            const response = await fetchWithTimeout(`${API_BASE_URL}/applications/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Application deleted:', result);
                clearCache('applications');
                await fetchApplications();
            } else {
                const result = await response.json();
                alert('Error deleting application: ' + (result.error || 'Server error'));
            }
            
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
            const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Job deleted:', result);
                clearCache('jobs');
                await fetchJobs();
            } else {
                const result = await response.json();
                alert('Error deleting job: ' + (result.error || 'Server error'));
            }
            
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
    const cached = getCache('jobs');
    if (cached) {
        jobs = cached;
        updateJobsTable();
        updateJobsStats();
    } else {
        const tbody = document.getElementById('jobsTableBody');
        if (tbody) tbody.innerHTML = loadingRow(8);
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs`);
        if (response.ok) {
            const data = await response.json();
            jobs = data.jobs || [];
            jobs = jobs.map((job, index) => ({
                ...job,
                id: job.id || job.applicationId || job.appId || `JOB-${index + 1}`
            }));
            setCache('jobs', jobs);
            updateJobsTable();
            updateJobsStats();
        } else {
            console.error('Error fetching jobs:', response.status);
            if (!cached) {
                const tbody = document.getElementById('jobsTableBody');
                if (tbody) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ef4444;">Error loading jobs. Server returned ' + response.status + '. Please try again.</td></tr>';
            }
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        jobs = jobs || [];
        if (!cached) {
            const tbody = document.getElementById('jobsTableBody');
            if (tbody) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ef4444;">Error loading jobs. Check your connection and try again.</td></tr>';
        }
    }
}

// Update job schedule (stored in jobs/ folder)
async function updateJobSchedule(jobId, scheduledDate) {
    if (!jobId) {
        alert('Error: Job ID is missing. Please try again.');
        return;
    }
    
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                scheduledDate: scheduledDate,
                jobStatus: scheduledDate ? 'scheduled' : 'pending'
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            clearCache('jobs');
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobStatus: status })
        });
        
        if (response.ok) {
            clearCache('jobs');
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
                <td>${Math.round(totalAcres * 100) / 100} acres</td>
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
            const fieldPhotoKeys = field.photoKeys && field.photoKeys.length ? field.photoKeys : (field.photoKey ? [field.photoKey] : []);
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
                                    `<button class="calc-view-btn" onclick="event.stopPropagation(); openCalculatorWithField('${field.fieldSize}', ${JSON.stringify(field.chemicals).replace(/"/g, '&quot;')}, ${JSON.stringify(field.chemicalRates || []).replace(/"/g, '&quot;')}, ${JSON.stringify(field.chemicalRateUnits || []).replace(/"/g, '&quot;')})" title="Calculate in Chemical Calculator">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>
                                     </button>` 
                                    : ''}
                            </span>
                        </div>
                    </div>
                    ${fieldPhotoKeys.length ? `
                    <div class="detail-field-photo">
                        <label>Field Photo${fieldPhotoKeys.length > 1 ? 's' : ''}</label>
                        <div class="detail-field-photo-grid">
                            ${fieldPhotoKeys.map((key, photoIndex) => `
                            <div class="job-field-photo" id="jobFieldPhoto_${index}_${photoIndex}">
                                <div class="field-photo-loading">Loading photo...</div>
                            </div>`).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </div>
        `;
        }).join('');
    }
    
    // Build Job Times display (all slots under one section)
    let jobTimesHtml = '';
    const displayTimeSlots = job.timeSlots && job.timeSlots.length ? job.timeSlots : (job.startTime || job.stopTime ? [{ start: job.startTime, stop: job.stopTime }] : []);
    if (displayTimeSlots.length) {
        jobTimesHtml = `
            <div class="detail-section">
                <h4>Job Times</h4>
                <div class="detail-grid">
                    ${displayTimeSlots.map((slot, i) => `
                    <div class="detail-item">
                        <label>Start${i > 0 ? ' ' + (i + 1) : ''}</label>
                        <span>${formatJobDateTime(slot.start)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Stop${i > 0 ? ' ' + (i + 1) : ''}</label>
                        <span>${formatJobDateTime(slot.stop)}</span>
                    </div>`).join('')}
                </div>
            </div>`;
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
            
            ${jobTimesHtml}
            
            ${job.message ? `
            <div class="detail-section">
                <h4>Additional Notes</h4>
                <p>${job.message}</p>
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('applicationDetailContent').innerHTML = content;
    
    // Load field photos into the detail modal
    if (job.fields) {
        job.fields.forEach((field, index) => {
            const fieldPhotoKeys = field.photoKeys && field.photoKeys.length ? field.photoKeys : (field.photoKey ? [field.photoKey] : []);
            fieldPhotoKeys.forEach((key, photoIndex) => {
                loadJobFieldPhoto(index, photoIndex, key);
            });
        });
    }
    
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${jobId}`, {
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
    const previousJobStatus = job.jobStatus;
    const newJobStatus = calculateJobStatus(job.jobStatus, job.fieldStatus, job.scheduledDate);
    job.jobStatus = newJobStatus;
    
    // Optimistically update the DOM immediately
    await viewJob(jobId);
    
    try {
        // Update job via API
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fieldStatus: job.fieldStatus,
                fieldCompletionDates: job.fieldCompletionDates,
                jobStatus: newJobStatus
            })
        });
        
        if (response.ok) {
            clearCache('jobs');
            fetchJobs();
        } else {
            console.error('Failed to update field status');
            // Revert the change
            job.fieldStatus[fieldIndex] = currentStatus;
            job.fieldCompletionDates[fieldIndex] = null;
            job.jobStatus = previousJobStatus;
            await viewJob(jobId);
        }
    } catch (error) {
        console.error('Error updating field status:', error);
        // Revert the change
        job.fieldStatus[fieldIndex] = currentStatus;
        job.fieldCompletionDates[fieldIndex] = null;
        job.jobStatus = previousJobStatus;
        await viewJob(jobId);
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
                        <div class="form-group field-photo-edit-group" style="grid-column: span 2;">
                            <label>Field Photos</label>
                            <div class="edit-field-photo-row">
                                <div class="edit-field-photo-list"></div>
                            </div>
                            <input type="file" class="edit-field-photo-input" accept="image/*" style="display: none;">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Build job time slots (supports multiple start/stop pairs)
    let jobTimeSlots = job.timeSlots && job.timeSlots.length ? job.timeSlots : [];
    if (jobTimeSlots.length === 0 && (job.startTime || job.stopTime)) {
        jobTimeSlots = [{ start: job.startTime, stop: job.stopTime }];
    }
    if (jobTimeSlots.length === 0) {
        jobTimeSlots = [{ start: '', stop: '' }];
    }
    const timeSlotsHtml = jobTimeSlots.map(slot => jobTimeSlotHtml(slot)).join('');
    
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
                <h4>Job Times</h4>
                <div id="editTimeSlots">
                    ${timeSlotsHtml}
                </div>
                <button type="button" class="add-times-btn" onclick="addJobTimeSlot()">
                    + Add Times
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
    
    // Initialize field photo state
    document.querySelectorAll('#editFieldGroups .edit-field-group').forEach((group, index) => {
        const field = job.fields[index] || {};
        const existingKeys = field.photoKeys && field.photoKeys.length ? field.photoKeys : (field.photoKey ? [field.photoKey] : []);
        setGroupPhotoKeys(group, existingKeys);
        renderEditFieldPhotoList(group);
    });
    
    updateJobTimeSlotRemoveButtons();
    
    // Set up event delegation for field photo controls (once per modal shell)
    const editContent = document.getElementById('editJobContent');
    if (editContent && !editContent.dataset.photoDelegationBound) {
        editContent.dataset.photoDelegationBound = 'true';
        editContent.addEventListener('click', function(e) {
            const previewEl = e.target.closest('.edit-field-photo-preview');
            if (previewEl) {
                toggleEditFieldPhotoMenu(previewEl);
                return;
            }
            const browseBtn = e.target.closest('.edit-field-photo-browse');
            if (browseBtn) {
                const group = browseBtn.closest('.edit-field-group');
                const item = browseBtn.closest('.edit-field-photo-item');
                group.dataset.photoTarget = item ? item.dataset.photoKey : 'new';
                const input = group.querySelector('.edit-field-photo-input');
                if (input) input.click();
                closeAllJobFieldPhotoMenus();
                return;
            }
            const removeBtn = e.target.closest('.edit-field-photo-remove');
            if (removeBtn) {
                const item = removeBtn.closest('.edit-field-photo-item');
                if (item) removeEditFieldPhoto(item);
                closeAllJobFieldPhotoMenus();
                return;
            }
            const addBtn = e.target.closest('.edit-field-photo-add');
            if (addBtn) {
                addEditFieldPhoto(addBtn.closest('.edit-field-group'));
            }
        });
        editContent.addEventListener('change', function(e) {
            if (e.target.classList.contains('edit-field-photo-input')) {
                const group = e.target.closest('.edit-field-group');
                if (group && e.target.files && e.target.files[0]) {
                    const target = group.dataset.photoTarget && group.dataset.photoTarget !== 'new' ? group.dataset.photoTarget : null;
                    uploadEditFieldPhoto(e.target.files[0], group, target);
                }
            }
        });
        editContent.addEventListener('dragover', function(e) {
            if (e.target.closest('.edit-field-group')) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            }
        });
        editContent.addEventListener('drop', function(e) {
            const group = e.target.closest('.edit-field-group');
            if (group && e.dataTransfer.files && e.dataTransfer.files[0]) {
                e.preventDefault();
                uploadEditFieldPhoto(e.dataTransfer.files[0], group, null);
            }
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
                <div class="form-group field-photo-edit-group" style="grid-column: span 2;">
                    <label>Field Photos</label>
                    <div class="edit-field-photo-row">
                        <div class="edit-field-photo-list"></div>
                    </div>
                    <input type="file" class="edit-field-photo-input" accept="image/*" style="display: none;">
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

    // Initialize photo state for this field
    const newGroup = container.lastElementChild;
    if (newGroup) {
        setGroupPhotoKeys(newGroup, []);
        renderEditFieldPhotoList(newGroup);
    }

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

// Get the current index of an edit field group based on DOM position
function getEditFieldGroupIndex(group) {
    return Array.from(document.querySelectorAll('#editFieldGroups .edit-field-group')).indexOf(group);
}

// Get presigned download URL for a field photo (cached, negative results too)
async function getJobPhotoUrl(key) {
    if (!key) return null;
    if (!window.jobPhotoUrlCache) window.jobPhotoUrlCache = {};
    if (key in window.jobPhotoUrlCache) return window.jobPhotoUrlCache[key];
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/job-photos?key=${encodeURIComponent(key)}`);
        if (response.ok) {
            const data = await response.json();
            window.jobPhotoUrlCache[key] = data.downloadUrl;
            return data.downloadUrl;
        }
    } catch (error) {
        console.error('Error getting photo URL:', error);
    }
    window.jobPhotoUrlCache[key] = null;
    return null;
}

// Get the URL for displaying a field photo: thumbnail with full-size fallback
async function getJobPhotoDisplayUrl(photoKey) {
    if (!photoKey) return null;
    if (!window.jobPhotoDisplayCache) window.jobPhotoDisplayCache = {};
    if (photoKey in window.jobPhotoDisplayCache) return window.jobPhotoDisplayCache[photoKey];
    const thumbKey = photoKey.replace(/\.(\w+)$/, '-thumb.jpg');
    const thumbUrl = await getJobPhotoUrl(thumbKey);
    if (thumbUrl) {
        window.jobPhotoDisplayCache[photoKey] = thumbUrl;
        return thumbUrl;
    }
    const fullUrl = await getJobPhotoUrl(photoKey);
    window.jobPhotoDisplayCache[photoKey] = fullUrl;
    return fullUrl;
}

// Downscale an image file to a small JPEG thumbnail for fast display
function generateThumbnail(file, maxSize = 600, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            const w = Math.max(1, Math.round(img.width * scale));
            const h = Math.max(1, Math.round(img.height * scale));
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                resolve(blob);
            }, 'image/jpeg', quality);
        };
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(null);
        };
        img.src = objectUrl;
    });
}

// Upload a small thumbnail alongside a field photo (best effort)
async function uploadFieldPhotoThumb(file, photoKey, fieldIndex, jobId, photoIndex = 0) {
    const thumbBlob = await generateThumbnail(file);
    if (!thumbBlob) return null;
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/job-photos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobId: jobId,
                fieldIndex: fieldIndex,
                fileName: 'thumb.jpg',
                fileType: 'image/jpeg',
                thumb: true,
                photoIndex: photoIndex
            })
        });
        if (!response.ok) return null;
        const data = await response.json();
        const putResponse = await fetchWithTimeout(data.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'image/jpeg' },
            body: thumbBlob
        }, 60000);
        if (!putResponse.ok) return null;
        const thumbUrl = URL.createObjectURL(thumbBlob);
        if (!window.jobPhotoUrlCache) window.jobPhotoUrlCache = {};
        if (!window.jobPhotoDisplayCache) window.jobPhotoDisplayCache = {};
        window.jobPhotoUrlCache[data.key] = thumbUrl;
        window.jobPhotoDisplayCache[photoKey] = thumbUrl;
        return thumbUrl;
    } catch (error) {
        console.error('Error uploading thumbnail:', error);
        return null;
    }
}

// Get the list of photo keys for an edit field group
function getGroupPhotoKeys(group) {
    try {
        return JSON.parse(group.dataset.photoKeys || '[]');
    } catch (error) {
        return [];
    }
}

// Set the list of photo keys for an edit field group
function setGroupPhotoKeys(group, keys) {
    group.dataset.photoKeys = JSON.stringify(keys);
    group.dataset.photoKey = keys[0] || '';
}

// Extract the photo index (n) from a key like field-0-1.jpg, or 0 for field-0.jpg
function getEditFieldPhotoIndexFromKey(key) {
    const match = key.match(/field-\d+-(\d+)\.\w+$/);
    return match ? parseInt(match[1], 10) : 0;
}

// HTML for one photo item in the edit modal (empty preview, filled in by render)
function editFieldPhotoItemHtml(key) {
    return `
        <div class="job-field-photo-menu edit-field-photo-item" data-photo-key="${key}">
            <div class="edit-field-photo-preview" title="Click for options">
                <span class="edit-field-photo-placeholder">Loading photo...</span>
            </div>
            <div class="job-field-photo-dropdown">
                <button type="button" class="job-field-photo-menu-item edit-field-photo-browse">Replace Photo</button>
                <button type="button" class="job-field-photo-menu-item edit-field-photo-add">Add Photo</button>
                <button type="button" class="job-field-photo-menu-item edit-field-photo-remove">Remove</button>
            </div>
        </div>`;
}

// Render all photo items for an edit field group
function renderEditFieldPhotoList(group) {
    const list = group.querySelector('.edit-field-photo-list');
    if (!list) return;
    const keys = getGroupPhotoKeys(group);
    if (!keys.length) {
        list.innerHTML = `
            <div class="job-field-photo-menu edit-field-photo-item" data-photo-key="">
                <div class="edit-field-photo-preview" title="Click for options">
                    <span class="edit-field-photo-placeholder">Click to add photo</span>
                </div>
                <div class="job-field-photo-dropdown">
                    <button type="button" class="job-field-photo-menu-item edit-field-photo-browse">Upload Photo</button>
                </div>
            </div>`;
        return;
    }
    list.innerHTML = keys.map(key => editFieldPhotoItemHtml(key)).join('');
    keys.forEach(key => {
        const item = list.querySelector(`.edit-field-photo-item[data-photo-key="${key}"]`);
        if (item) renderEditFieldPhotoPreview(item, key);
    });
}

// Render a single photo preview in the edit job modal
async function renderEditFieldPhotoPreview(item, key) {
    const preview = item.querySelector('.edit-field-photo-preview');
    if (!preview) return;
    
    const url = await getJobPhotoDisplayUrl(key);
    if (!item.isConnected || item.dataset.photoKey !== key) return; // State changed while loading
    if (url) {
        preview.innerHTML = `<img src="${url}" alt="Field photo">`;
    } else {
        preview.innerHTML = '<span class="edit-field-photo-placeholder">Photo unavailable</span>';
    }
}

// Upload a file to a presigned URL with progress reporting (XHR)
function uploadFileWithProgress(uploadUrl, file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type || 'image/jpeg');
        xhr.timeout = 60000;
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve();
            else reject(new Error('Upload failed: ' + xhr.status));
        };
        xhr.onerror = () => reject(new Error('Upload network error'));
        xhr.ontimeout = () => reject(new Error('Upload timed out'));
        xhr.send(file);
    });
}

// Open the file picker to add a new photo to a field
function addEditFieldPhoto(group) {
    const input = group.querySelector('.edit-field-photo-input');
    if (!input) return;
    group.dataset.photoTarget = 'new';
    input.click();
    closeAllJobFieldPhotoMenus();
}

// Upload a photo for a field in the edit job modal (targetKey = replace that key, null = add new)
async function uploadEditFieldPhoto(file, group, targetKey) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, etc.)');
        return;
    }
    const fieldIndex = getEditFieldGroupIndex(group);
    const jobId = currentApplicationId;
    const isNew = !targetKey;
    const photoIndex = isNew ? getGroupPhotoKeys(group).length : getEditFieldPhotoIndexFromKey(targetKey);
    
    const list = group.querySelector('.edit-field-photo-list');
    if (!list) return;
    
    let item;
    if (isNew) {
        const existingEmpty = list.querySelector('.edit-field-photo-item[data-photo-key=""]');
        if (existingEmpty && getGroupPhotoKeys(group).length === 0) {
            item = existingEmpty;
        } else {
            list.insertAdjacentHTML('beforeend', editFieldPhotoItemHtml(''));
            item = list.lastElementChild;
            item.dataset.photoKey = '';
        }
    } else {
        item = list.querySelector(`.edit-field-photo-item[data-photo-key="${targetKey}"]`);
    }
    if (!item) return;
    const preview = item.querySelector('.edit-field-photo-preview');
    
    const showUploadProgress = (pct, label) => {
        const fill = preview.querySelector('.upload-progress-fill');
        const text = preview.querySelector('.upload-progress-text');
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = pct === null ? label : `${label} ${pct}%`;
    };
    
    // Show progress UI while uploading
    preview.innerHTML = `
        <div class="upload-progress">
            <div class="upload-progress-bar">
                <div class="upload-progress-fill"></div>
            </div>
            <span class="upload-progress-text">Uploading... 0%</span>
        </div>`;
    
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/job-photos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobId: jobId,
                fieldIndex: fieldIndex,
                fileName: file.name,
                fileType: file.type || 'image/jpeg',
                photoIndex: photoIndex
            })
        });
        if (!response.ok) {
            alert('Error starting photo upload. Please try again.');
            renderEditFieldPhotoList(group);
            return;
        }
        const data = await response.json();
        
        await uploadFileWithProgress(data.uploadUrl, file, (pct) => showUploadProgress(pct, 'Uploading'));
        
        showUploadProgress(100, 'Finalizing');
        await uploadFieldPhotoThumb(file, data.key, fieldIndex, jobId, photoIndex);
        
        const keys = getGroupPhotoKeys(group);
        if (isNew) {
            keys.push(data.key);
        }
        setGroupPhotoKeys(group, keys);
        renderEditFieldPhotoList(group);
        closeAllJobFieldPhotoMenus();
    } catch (error) {
        console.error('Error uploading field photo:', error);
        alert('Error uploading photo. Please try again.');
        renderEditFieldPhotoList(group);
    }
}

// Remove a photo item from a field in the edit job modal
async function removeEditFieldPhoto(item) {
    const group = item.closest('.edit-field-group');
    const key = item.dataset.photoKey;
    if (key) {
        const thumbKey = key.replace(/\.(\w+)$/, '-thumb.jpg');
        for (const photoKey of [key, thumbKey]) {
            try {
                await fetchWithTimeout(`${API_BASE_URL}/job-photos?key=${encodeURIComponent(photoKey)}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Error deleting field photo:', error);
            }
            if (window.jobPhotoUrlCache) {
                delete window.jobPhotoUrlCache[photoKey];
                delete window.jobPhotoUrlCache[thumbKey];
            }
            if (window.jobPhotoDisplayCache) delete window.jobPhotoDisplayCache[photoKey];
        }
    }
    if (group) {
        setGroupPhotoKeys(group, getGroupPhotoKeys(group).filter(k => k !== key));
        renderEditFieldPhotoList(group);
    }
}

// Load a field photo into the job detail modal
async function loadJobFieldPhoto(index, photoIndex, key) {
    const container = document.getElementById(`jobFieldPhoto_${index}_${photoIndex}`);
    if (!container) return;
    const url = await getJobPhotoDisplayUrl(key);
    if (!url) {
        container.remove();
        const section = container.closest('.detail-field-photo');
        const grid = section && section.querySelector('.detail-field-photo-grid');
        if (grid && !grid.querySelector('.job-field-photo')) section.remove();
        return;
    }
    const safeKey = key.replace(/'/g, "\\'");
    container.innerHTML = `
        <div class="job-field-photo-menu">
            <img src="${url}" alt="Field photo" class="job-field-photo-img" loading="lazy" onclick="toggleJobFieldPhotoMenu(this)" title="Click for options">
            <div class="job-field-photo-dropdown">
                <button class="job-field-photo-menu-item" onclick="viewJobFieldPhoto('${safeKey}'); closeAllJobFieldPhotoMenus()">View</button>
                <button class="job-field-photo-menu-item" onclick="downloadJobFieldPhoto('${safeKey}'); closeAllJobFieldPhotoMenus()">Download</button>
            </div>
        </div>`;
}

// Toggle the photo options dropdown (job detail modal)
function toggleJobFieldPhotoMenu(img) {
    const menu = img.closest('.job-field-photo-menu');
    if (!menu) return;
    const wasOpen = menu.classList.contains('open');
    closeAllJobFieldPhotoMenus();
    if (!wasOpen) menu.classList.add('open');
}

// Toggle the photo options dropdown (edit job modal)
function toggleEditFieldPhotoMenu(preview) {
    const menu = preview.closest('.job-field-photo-menu');
    if (!menu) return;
    const wasOpen = menu.classList.contains('open');
    closeAllJobFieldPhotoMenus();
    if (!wasOpen) menu.classList.add('open');
}

// Close all photo option dropdowns (job detail + edit modals)
function closeAllJobFieldPhotoMenus() {
    document.querySelectorAll('.job-field-photo-menu.open').forEach(menu => {
        menu.classList.remove('open');
    });
}

// Close photo option dropdowns when clicking elsewhere
document.addEventListener('click', function(e) {
    if (!e.target.closest('.job-field-photo-menu')) {
        closeAllJobFieldPhotoMenus();
    }
});

// Open a field photo in a new tab (job detail modal)
async function viewJobFieldPhoto(key) {
    const url = await getJobPhotoUrl(key);
    if (url) window.open(url, '_blank');
}

// Download a field photo (job detail modal)
async function downloadJobFieldPhoto(key) {
    const url = await getJobPhotoUrl(key);
    if (!url) return;
    const parts = key.split('/');
    const filename = parts.length > 2 ? parts[1] + '-' + parts[2] : parts[parts.length - 1];
    try {
        const response = await fetchWithTimeout(url, {}, 60000);
        if (!response.ok) {
            console.error('Error downloading photo:', response.status);
            return;
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (error) {
        console.error('Error downloading field photo:', error);
    }
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
    const timeSlots = collectJobTimeSlots();
    
    // Validate each time slot
    for (let i = 0; i < timeSlots.length; i++) {
        if (timeSlots[i].start && timeSlots[i].stop && timeSlots[i].stop < timeSlots[i].start) {
            alert(`Stop time must be after start time (row ${i + 1}).`);
            return;
        }
    }
    
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
        timeSlots: timeSlots,
        startTime: timeSlots[0] ? timeSlots[0].start : '',
        stopTime: timeSlots[0] ? timeSlots[0].stop : '',
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
            optimalDate: document.getElementById(`edit_optimalDate_${index}`).value,
            photoKey: group.dataset.photoKey || '',
            photoKeys: getGroupPhotoKeys(group)
        });
    });
    
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedJob)
        });
        
        if (response.ok) {
            // Update local data
            Object.assign(job, updatedJob);
            closeEditJobModal();
            clearCache('jobs');
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
    openFieldCalendar(function(dateStr) {
        document.getElementById(`edit_optimalDate_${fieldIndex}`).value = dateStr;
    });
}

// Split stored job time "2026-07-31T08:30" into date + display time for the edit modal
function splitJobDateTime(iso) {
    if (!iso) return { date: '', display: '' };
    const parts = iso.split('T');
    if (parts.length !== 2) return { date: '', display: '' };
    const timeParts = parts[1].split(':');
    if (timeParts.length < 2) return { date: parts[0], display: '' };
    let hours = parseInt(timeParts[0], 10);
    if (isNaN(hours)) return { date: parts[0], display: '' };
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return { date: parts[0], display: `${hours}:${timeParts[1]} ${ampm}` };
}

// Combine date + display time into "2026-07-31T08:30" for storage
function combineJobDateTime(dateStr, timeDisplay) {
    if (!dateStr || !timeDisplay) return '';
    const m = timeDisplay.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return '';
    let hours = parseInt(m[1], 10);
    if (m[3].toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (m[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
    return `${dateStr}T${String(hours).padStart(2, '0')}:${m[2]}`;
}

// Format stored job time for display in the detail modal
function formatJobDateTime(iso) {
    if (!iso) return 'Not set';
    const parts = iso.split('T');
    if (parts.length !== 2) return iso;
    const dateParts = parts[0].split('-');
    const timeParts = parts[1].split(':');
    if (dateParts.length !== 3 || timeParts.length < 2) return iso;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[parseInt(dateParts[1], 10) - 1] || dateParts[1];
    let hours = parseInt(timeParts[0], 10);
    if (isNaN(hours)) return iso;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${month} ${parseInt(dateParts[2], 10)}, ${dateParts[0]} ${hours}:${timeParts[1]} ${ampm}`;
}

// Date picking for job start/stop times (reuses the existing calendar modal)
// Date picking for job time slots (reuses the existing calendar modal, past dates allowed)
function openJobTimeDatePicker(input) {
    closeJobTimePicker();
    openFieldCalendar(function(dateStr) {
        input.value = dateStr;
    }, true);
}

// Custom click-only time picker popover for job time slots
let jobTimePickerInput = null;
let jobTimePickerInitialized = false;

function openJobTimePicker(input) {
    if (!input) return;
    const popover = document.getElementById('jobTimePicker');
    if (popover && popover.classList.contains('active') && jobTimePickerInput === input) {
        closeJobTimePicker();
        return;
    }
    jobTimePickerInput = input;
    buildJobTimePicker();
    const popoverEl = document.getElementById('jobTimePicker');
    const rect = input.getBoundingClientRect();
    popoverEl.style.top = (rect.bottom + 4) + 'px';
    popoverEl.style.left = Math.max(8, rect.left) + 'px';
    const current = input.value;
    const m = current.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    let hours = 9;
    let minutes = '00';
    let ampm = 'AM';
    if (m) {
        hours = parseInt(m[1], 10);
        minutes = m[2];
        ampm = m[3].toUpperCase();
    }
    document.getElementById('jobTimeHour').value = hours;
    document.getElementById('jobTimeMinute').value = minutes;
    document.getElementById('jobTimeAmpm').value = ampm;
    popoverEl.classList.add('active');
}

function buildJobTimePicker() {
    if (jobTimePickerInitialized) return;
    jobTimePickerInitialized = true;
    const popover = document.createElement('div');
    popover.id = 'jobTimePicker';
    popover.className = 'job-time-popover';
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(h => `<option value="${h}">${h}</option>`).join('');
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
        .map(m => `<option value="${m}">${m}</option>`).join('');
    popover.innerHTML = `
        <div class="job-time-row">
            <select id="jobTimeHour">${hours}</select>
            <span class="job-time-colon">:</span>
            <select id="jobTimeMinute">${minutes}</select>
            <select id="jobTimeAmpm">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
        <div class="job-time-actions">
            <button type="button" class="btn btn-sm btn-secondary" onclick="clearJobTime()">Clear</button>
            <button type="button" class="btn btn-sm btn-primary" onclick="commitJobTime()">Done</button>
        </div>
    `;
    document.body.appendChild(popover);
    ['jobTimeHour', 'jobTimeMinute', 'jobTimeAmpm'].forEach(id => {
        document.getElementById(id).addEventListener('change', updateJobTimePreview);
    });
}

function updateJobTimePreview() {
    const hours = document.getElementById('jobTimeHour').value;
    const minutes = document.getElementById('jobTimeMinute').value;
    const ampm = document.getElementById('jobTimeAmpm').value;
    if (jobTimePickerInput) jobTimePickerInput.value = `${hours}:${minutes} ${ampm}`;
}

function commitJobTime() {
    updateJobTimePreview();
    closeJobTimePicker();
}

function clearJobTime() {
    if (jobTimePickerInput) jobTimePickerInput.value = '';
    closeJobTimePicker();
}

function closeJobTimePicker() {
    const popover = document.getElementById('jobTimePicker');
    if (popover) popover.classList.remove('active');
    jobTimePickerInput = null;
}

// Close the time picker when clicking elsewhere
document.addEventListener('click', function(e) {
    if (e.target.closest('.job-time-popover')) return;
    if (e.target.closest('.job-time-input')) return;
    closeJobTimePicker();
});

// Build HTML for one job time slot row
function jobTimeSlotHtml(slot) {
    const start = splitJobDateTime(slot && slot.start);
    const stop = splitJobDateTime(slot && slot.stop);
    return `
        <div class="job-time-slot">
            <div class="form-group">
                <label>Start Time</label>
                <div class="job-time-picker">
                    <input type="text" class="job-time-input job-time-date-input" data-target="start" value="${start.date}" placeholder="Select date" readonly onclick="openJobTimeDatePicker(this)">
                    <input type="text" class="job-time-input job-time-time-input" data-target="start" value="${start.display}" placeholder="Select time" readonly onclick="openJobTimePicker(this)">
                </div>
            </div>
            <div class="form-group">
                <label>Stop Time</label>
                <div class="job-time-picker">
                    <input type="text" class="job-time-input job-time-date-input" data-target="stop" value="${stop.date}" placeholder="Select date" readonly onclick="openJobTimeDatePicker(this)">
                    <input type="text" class="job-time-input job-time-time-input" data-target="stop" value="${stop.display}" placeholder="Select time" readonly onclick="openJobTimePicker(this)">
                </div>
            </div>
            <button type="button" class="job-time-slot-remove" onclick="removeJobTimeSlot(this)" title="Remove times">✕</button>
        </div>`;
}

// Add another job time slot row
function addJobTimeSlot() {
    const container = document.getElementById('editTimeSlots');
    if (!container) return;
    container.insertAdjacentHTML('beforeend', jobTimeSlotHtml(null));
    updateJobTimeSlotRemoveButtons();
}

// Remove a job time slot row
function removeJobTimeSlot(btn) {
    const slot = btn.closest('.job-time-slot');
    if (!slot) return;
    slot.remove();
    updateJobTimeSlotRemoveButtons();
}

// Hide the remove button when only one slot remains
function updateJobTimeSlotRemoveButtons() {
    const container = document.getElementById('editTimeSlots');
    if (!container) return;
    const slots = container.querySelectorAll('.job-time-slot');
    slots.forEach(slot => {
        const btn = slot.querySelector('.job-time-slot-remove');
        if (btn) btn.style.display = slots.length > 1 ? '' : 'none';
    });
}

// Collect all time slots from the edit modal
function collectJobTimeSlots() {
    const slots = [];
    document.querySelectorAll('#editTimeSlots .job-time-slot').forEach(slot => {
        const start = combineJobDateTime(
            slot.querySelector('.job-time-date-input[data-target="start"]').value,
            slot.querySelector('.job-time-time-input[data-target="start"]').value
        );
        const stop = combineJobDateTime(
            slot.querySelector('.job-time-date-input[data-target="stop"]').value,
            slot.querySelector('.job-time-time-input[data-target="stop"]').value
        );
        if (start || stop) slots.push({ start, stop });
    });
    return slots;
}

// Open map for field location in edit modal / new app modal
let editFieldMapIndex = null;
let editFieldMap = null;
let editFieldMarker = null;
let editFieldMapInitialized = false;
let mapModalTargetInput = null;

function openEditFieldMap(fieldIndex) {
    editFieldMapIndex = fieldIndex;
    mapModalTargetInput = document.getElementById(`edit_fieldLocation_${fieldIndex}`);
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
    if (mapModalTargetInput) {
        mapModalTargetInput.value = `${lat}, ${lng}`;
    }
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
                const acres = parseFloat(field.fieldSize) || 0;
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
    updateUpcomingJobs();
    renderFarmProfiles();
    renderReportsPage();
}

// Update the Upcoming Jobs section on the overview (5 soonest not-completed jobs with a scheduled date)
function updateUpcomingJobs() {
    const body = document.getElementById('upcomingJobsBody');
    if (!body) return;
    
    const upcoming = jobs
        .filter(j => j.scheduledDate && calculateJobStatus(j.jobStatus, j.fieldStatus, j.scheduledDate) !== 'completed')
        .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
        .slice(0, 5);
    
    if (upcoming.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="no-data">No upcoming jobs</td></tr>';
        return;
    }
    
    body.innerHTML = upcoming.map(job => {
        const clientName = job.fullName || job.client || 'N/A';
        const totalAcres = (job.fields || []).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0) || job.acres || 0;
        const cropTypes = [...new Set((job.fields || []).map(f => f.cropType).filter(Boolean))].join(', ') || job.crops || 'N/A';
        const status = calculateJobStatus(job.jobStatus, job.fieldStatus, job.scheduledDate) || job.jobStatus || 'pending';
        const statusClass = status === 'scheduled' ? 'scheduled' : 
                           status === 'completed' ? 'completed' :
                           status === 'in_progress' ? 'in_progress' : 'pending';
        
        return `
            <tr class="clickable-row" onclick="viewJob('${job.id}')">
                <td>${job.id}</td>
                <td>${clientName}</td>
                <td>${Math.round(totalAcres * 100) / 100} acres</td>
                <td>${cropTypes}</td>
                <td>${formatDate(job.scheduledDate)}</td>
                <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
            </tr>
        `;
    }).join('');
}

// ============================================
// REPORTS
// ============================================

// Collect every completed field record: { job, farm, field, acres, crop, date }
function getCompletions() {
    const out = [];
    (jobs || []).forEach(job => {
        const farm = (job.fullName || job.client || 'Unknown').trim();
        (job.fields || []).forEach((field, i) => {
            if (job.fieldStatus && job.fieldStatus[i] === 'complete' && job.fieldCompletionDates && job.fieldCompletionDates[i]) {
                const d = new Date(job.fieldCompletionDates[i]);
                if (isNaN(d.getTime())) return;
                out.push({
                    job: job,
                    farm: farm,
                    field: field.fieldName || 'Field ' + (i + 1),
                    acres: parseFloat(field.fieldSize) || 0,
                    crop: field.cropType || '—',
                    date: d
                });
            }
        });
    });
    return out;
}

const REPORT_MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const REPORT_CROP_COLORS = ['#4CAF50', '#d4a94c', '#3a7a8a', '#9c6b3f', '#8a5fa0', '#7ea8e8', '#e07a5f'];

// Render the Reports page (Sample 1: analytics dashboard) from job data
function renderReportsPage() {
    const select = document.getElementById('reportYear');
    if (!select) return;

    const completions = getCompletions();
    const years = [...new Set(completions.map(c => c.date.getFullYear()))].sort();
    if (years.length === 0) years.push(new Date().getFullYear());
    const current = years.includes(Number(select.value)) ? Number(select.value) : Math.max(...years);
    const prevYear = current - 1;
    select.innerHTML = years.map(y => `<option value="${y}" ${y === current ? 'selected' : ''}>${y}</option>`).join('');

    const inYear = completions.filter(c => c.date.getFullYear() === current);
    const inPrev = completions.filter(c => c.date.getFullYear() === prevYear);

    const sum = list => list.reduce((s, c) => s + c.acres, 0);
    const acres = sum(inYear);
    const prevAcres = sum(inPrev);
    const jobsDone = new Set(inYear.map(c => c.job.id)).size;
    const prevJobs = new Set(inPrev.map(c => c.job.id)).size;
    const farmsActive = new Set(inYear.map(c => c.farm)).size;
    const today = new Date();
    const thisMonthAcres = sum(inYear.filter(c => c.date.getMonth() === today.getMonth()));

    // New clients = farms whose earliest completion ever falls in the selected year
    const firstByFarm = {};
    completions.forEach(c => {
        if (!firstByFarm[c.farm] || c.date < firstByFarm[c.farm]) firstByFarm[c.farm] = c.date;
    });
    const newClients = Object.values(firstByFarm).filter(d => d.getFullYear() === current).length;
    const newPrev = Object.values(firstByFarm).filter(d => d.getFullYear() === prevYear).length;
    const newDelta = newClients - newPrev;
    const pct = prevAcres ? Math.round((acres - prevAcres) / prevAcres * 100) : null;
    const jobDelta = jobsDone - prevJobs;
    const arrow = n => (n >= 0 ? '▲' : '▼') + ' ' + Math.abs(n);
    const hasPrev = completions.some(c => c.date.getFullYear() === prevYear);
    const prevSub = hasPrev ? `${arrow(jobDelta)} vs ${prevYear}` : `No data from ${prevYear}`;

    document.getElementById('reportsKpis').innerHTML = `
        <div class="report-kpi">
            <div class="label">Total Acres Sprayed</div>
            <div class="value">${Math.round(acres).toLocaleString()}<span class="unit"> ac</span></div>
            <div class="sub">${pct === null ? 'No data from ' + prevYear : arrow(pct) + '% vs ' + prevYear}</div>
        </div>
        <div class="report-kpi">
            <div class="label">Jobs Completed</div>
            <div class="value">${jobsDone}</div>
            <div class="sub ${jobDelta < 0 ? 'down' : ''}">${hasPrev ? (jobDelta === 0 ? 'Same as ' + prevYear : prevSub) : prevSub}</div>
        </div>
        <div class="report-kpi">
            <div class="label">Active Farms</div>
            <div class="value">${farmsActive}</div>
            <div class="sub">This season</div>
        </div>
        <div class="report-kpi">
            <div class="label">New Clients</div>
            <div class="value">${newClients}</div>
            <div class="sub ${newDelta < 0 ? 'down' : ''}">${hasPrev ? (newDelta === 0 ? 'Same as ' + prevYear : arrow(newDelta) + ' vs ' + prevYear) : 'No data from ' + prevYear}</div>
        </div>
        <div class="report-kpi">
            <div class="label">Acres This Month</div>
            <div class="value">${Math.round(thisMonthAcres).toLocaleString()}<span class="unit"> ac</span></div>
            <div class="sub">${today.toLocaleDateString('en-US', { month: 'long' })} ${current}</div>
        </div>`;

    // Acres by month bar chart
    const monthChart = document.getElementById('reportsMonthChart');
    const byMonth = Array(12).fill(0);
    inYear.forEach(c => byMonth[c.date.getMonth()] += c.acres);
    const maxMonth = Math.max(...byMonth);
    if (inYear.length === 0) {
        monthChart.innerHTML = `<div class="reports-empty">No completions in ${current}</div>`;
    } else {
        monthChart.innerHTML = byMonth.map((a, m) => `
            <div class="bar-col">
                <div class="reports-bar" style="height: ${maxMonth ? Math.max(a / maxMonth * 100, 2) : 2}%;" data-tooltip="${Math.round(a).toLocaleString()} ac"></div>
                <span>${REPORT_MONTH_LABELS[m]}</span>
            </div>`).join('');
    }

    // Crop breakdown bars
    const cropBars = document.getElementById('reportsCropBars');
    const byCrop = {};
    inYear.forEach(c => byCrop[c.crop] = (byCrop[c.crop] || 0) + c.acres);
    const crops = Object.entries(byCrop).sort((a, b) => b[1] - a[1]);
    if (crops.length === 0) {
        cropBars.innerHTML = `<div class="reports-empty">No completions in ${current}</div>`;
    } else {
        const maxCrop = crops[0][1];
        const cropTotal = crops.reduce((s, c) => s + c[1], 0);
        cropBars.innerHTML = crops.map(([name, a], i) => `
            <div class="bar-row">
                <span class="lbl">${escapeHtml(name)}</span>
                <div class="track"><div class="fill" style="width: ${a / maxCrop * 100}%; background: ${REPORT_CROP_COLORS[i % REPORT_CROP_COLORS.length]};">${Math.round(a).toLocaleString()}</div></div>
                <span class="pct">${Math.round(a / cropTotal * 100)}%</span>
            </div>`).join('');
    }

    // Top farms by acres
    const topFarms = document.getElementById('reportsTopFarms');
    const byFarm = {};
    inYear.forEach(c => {
        if (!byFarm[c.farm]) byFarm[c.farm] = { acres: 0, jobs: new Set() };
        byFarm[c.farm].acres += c.acres;
        byFarm[c.farm].jobs.add(c.job.id);
    });
    const farms = Object.entries(byFarm).sort((a, b) => b[1].acres - a[1].acres).slice(0, 6);
    if (farms.length === 0) {
        topFarms.innerHTML = `<tr><td colspan="4" class="reports-empty">No completions in ${current}</td></tr>`;
    } else {
        topFarms.innerHTML = farms.map(([name, f], i) => `
            <tr>
                <td style="color: var(--text-muted); font-size: 0.8rem;">${i + 1}</td>
                <td>${escapeHtml(name)}</td>
                <td class="num">${f.jobs.size}</td>
                <td class="num">${Math.round(f.acres).toLocaleString()}</td>
            </tr>`).join('');
    }

    // Recent completions: latest completion per job, newest first
    const recent = document.getElementById('reportsRecent');
    const byJob = {};
    completions.forEach(c => {
        if (!byJob[c.job.id] || c.date > byJob[c.job.id].date) byJob[c.job.id] = c;
    });
    const latest = Object.values(byJob).sort((a, b) => b.date - a.date).slice(0, 6);
    if (latest.length === 0) {
        recent.innerHTML = `<tr><td colspan="5" class="reports-empty">No completed fields yet</td></tr>`;
    } else {
        recent.innerHTML = latest.map(c => `
            <tr class="clickable-row" onclick="viewJob('${c.job.id}')">
                <td>${c.job.id}</td>
                <td>${escapeHtml(c.farm)}</td>
                <td>${escapeHtml(c.field)}</td>
                <td class="num">${Math.round(c.acres * 100) / 100}</td>
                <td>${c.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
            </tr>`).join('');
    }
}

// ============================================
// FARM PROFILES
// ============================================

let farmProfileMap = null;
let farmProfileMarkers = [];

// Parse "lat, lng" coordinates from a field location string
function parseFieldCoords(loc) {
    if (!loc) return null;
    const m = String(loc).match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
    return m && Math.abs(parseFloat(m[1])) <= 90 && Math.abs(parseFloat(m[2])) <= 180 ? m : null;
}

// Build farm profiles by grouping jobs by client name
function buildFarmProfiles() {
    const farmsMap = {};
    (jobs || []).forEach(job => {
        const name = (job.fullName || job.client || '').trim();
        if (!name) return;
        if (!farmsMap[name]) {
            farmsMap[name] = {
                name: name,
                phone: '', email: '', address: '', city: '', state: '', zip: '',
                fieldsMap: {}, jobs: [], lastService: null, nextScheduled: null
            };
        }
        const farm = farmsMap[name];
        if (job.phone) farm.phone = job.phone;
        if (job.email) farm.email = job.email;
        if (job.address) farm.address = job.address;
        if (job.city) farm.city = job.city;
        if (job.state) farm.state = job.state;
        if (job.zip) farm.zip = job.zip;
        
        (job.fields || []).forEach(field => {
            const key = (field.fieldName || '').trim().toLowerCase();
            if (!key) return;
            const existing = farm.fieldsMap[key];
            if (!existing) {
                farm.fieldsMap[key] = field;
            } else if ((!existing.fieldLocation || (!existing.photoKeys && !existing.photoKey)) && (field.fieldLocation || field.photoKeys || field.photoKey)) {
                farm.fieldsMap[key] = field;
            }
        });
        
        (job.fieldCompletionDates || []).forEach(d => {
            if (!d) return;
            const t = new Date(d).getTime();
            if (t && (!farm.lastService || t > new Date(farm.lastService).getTime())) farm.lastService = d;
        });
        
        const status = calculateJobStatus(job.jobStatus, job.fieldStatus, job.scheduledDate) || job.jobStatus || 'pending';
        if (job.scheduledDate && status !== 'completed') {
            const t = new Date(job.scheduledDate).getTime();
            if (t && (!farm.nextScheduled || t < new Date(farm.nextScheduled).getTime())) farm.nextScheduled = job.scheduledDate;
        }
        
        farm.jobs.push({ ...job, _status: status });
    });
    
    return Object.values(farmsMap).map(farm => ({
        ...farm,
        fields: Object.values(farm.fieldsMap),
        totalAcres: Object.values(farm.fieldsMap).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0),
        crops: [...new Set(Object.values(farm.fieldsMap).map(f => f.cropType).filter(Boolean))].join(', ')
    })).sort((a, b) => a.name.localeCompare(b.name));
}

// Render farm profile cards with search filtering
function renderFarmProfiles() {
    const grid = document.getElementById('farmProfilesGrid');
    if (!grid) return;
    
    const farms = buildFarmProfiles();
    const searchEl = document.getElementById('farmSearch');
    const q = (searchEl ? searchEl.value : '').toLowerCase();
    const filtered = farms.filter(f => (f.name + ' ' + f.city + ' ' + f.state).toLowerCase().includes(q));
    
    const count = document.getElementById('farmCount');
    if (count) count.textContent = `${filtered.length} of ${farms.length} farms`;
    
    if (farms.length === 0) {
        grid.innerHTML = '<div class="no-data" style="grid-column: 1/-1; text-align: center; padding: 40px;">No farm profiles yet. Approve an application to create a job and the farm will appear here.</div>';
        return;
    }
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-data" style="grid-column: 1/-1; text-align: center; padding: 40px;">No farms match your search</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(farm => `
        <div class="profile-card farm-card" onclick="openFarmProfile(this)" data-name="${escapeHtml(farm.name)}">
            <div class="profile-header">
                <h3>${escapeHtml(farm.name)}</h3>
            </div>
            <div class="farm-location">${escapeHtml(farm.city || '')}${farm.city && farm.state ? ', ' : ''}${escapeHtml(farm.state || '')}</div>
            <div class="farm-stats">
                <div class="farm-stat">
                    <span class="farm-stat-num">${Math.round(farm.totalAcres * 100) / 100}</span>
                    <span class="farm-stat-lbl">Acres</span>
                </div>
                <div class="farm-stat">
                    <span class="farm-stat-num">${farm.fields.length}</span>
                    <span class="farm-stat-lbl">Fields</span>
                </div>
                <div class="farm-stat">
                    <span class="farm-stat-num">${farm.jobs.length}</span>
                    <span class="farm-stat-lbl">Jobs</span>
                </div>
            </div>
            <div class="farm-crops">${escapeHtml(farm.crops || '—')}</div>
            <div class="farm-dates">
                <span>Last service: <b>${farm.lastService ? formatDate(farm.lastService) : '—'}</b></span>
                <span>Next scheduled: <b>${farm.nextScheduled ? formatDate(farm.nextScheduled) : '—'}</b></span>
            </div>
        </div>`).join('');
}

// Open the farm profile detail modal
async function openFarmProfile(card) {
    const name = card.dataset.name;
    const farm = buildFarmProfiles().find(f => f.name === name);
    if (!farm) return;
    
    document.getElementById('farmProfileTitle').textContent = farm.name;
    
    const upcoming = farm.jobs
        .filter(j => j.scheduledDate && j._status !== 'completed')
        .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
    const mapped = farm.fields.filter(f => parseFieldCoords(f.fieldLocation));
    const address = [farm.address, farm.city, farm.state, farm.zip].filter(Boolean).join(', ') || 'No address on file';
    const phone = farm.phone ? farm.phone.replace(/[^+\d]/g, '') : '';
    
    document.getElementById('farmProfileContent').innerHTML = `
        <div class="farm-detail">
            <div class="farm-contact">
                ${phone ? `<a href="tel:${phone}">${escapeHtml(farm.phone)}</a>` : '<span>No phone</span>'}
                ${farm.email ? `<a href="mailto:${escapeHtml(farm.email)}">${escapeHtml(farm.email)}</a>` : '<span>No email</span>'}
                <span>${escapeHtml(address)}</span>
            </div>
            <div class="farm-stat-strip">
                <div class="box"><div class="num">${Math.round(farm.totalAcres * 100) / 100}</div><div class="lbl">Total Acres</div></div>
                <div class="box"><div class="num">${farm.fields.length}</div><div class="lbl">Fields</div></div>
                <div class="box"><div class="num">${farm.jobs.length}</div><div class="lbl">Jobs</div></div>
                <div class="box"><div class="num">${mapped.length}</div><div class="lbl">Mapped Fields</div></div>
            </div>
            <div class="farm-section">
                <h4>Upcoming Work</h4>
                ${upcoming.length ? upcoming.slice(0, 5).map(j => `
                    <div class="farm-upcoming-row">
                        <span class="id">${j.id}</span>
                        <span class="date">${formatDate(j.scheduledDate)}</span>
                        <span class="status ${j._status === 'in_progress' ? 'in_progress' : 'scheduled'}">${j._status.replace('_', ' ')}</span>
                    </div>`).join('') : '<div class="farm-muted">No upcoming work scheduled</div>'}
            </div>
            <div class="farm-section">
                <h4>Fields</h4>
                <div class="data-table">
                    <table class="farm-fields-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Field</th>
                                <th>Acres</th>
                                <th>Crop</th>
                                <th>GPA</th>
                                <th>Optimal Date</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${farm.fields.map((field, i) => {
                                const coords = parseFieldCoords(field.fieldLocation);
                                const photoKey = (field.photoKeys && field.photoKeys[0]) || field.photoKey || '';
                                return `
                                <tr>
                                    <td><div class="farm-photo-thumb" data-key="${escapeHtml(photoKey)}"></div></td>
                                    <td>${coords ? `<span class="farm-field-link" data-lat="${coords[1]}" data-lng="${coords[2]}" title="Zoom to field on map" onclick="focusFarmField(this)">${escapeHtml(field.fieldName || 'Field ' + (i + 1))}</span>` : escapeHtml(field.fieldName || 'Field ' + (i + 1))}</td>
                                    <td>${field.fieldSize || '—'}</td>
                                    <td>${escapeHtml(field.cropType || '—')}</td>
                                    <td>${field.gpa || '—'}</td>
                                    <td>${field.optimalDate ? formatDate(field.optimalDate) : '—'}</td>
                                    <td>${coords ? `<span class="farm-coords">${coords[1]}, ${coords[2]}</span>` : '<span class="farm-muted">Not set</span>'}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="farm-section">
                <h4>Field Map</h4>
                <div id="farmProfileMap" class="farm-map"></div>
                <div class="farm-muted">${mapped.length} of ${farm.fields.length} fields have GPS coordinates.</div>
            </div>
            <div class="farm-section">
                <h4>Job History</h4>
                <div class="farm-jobs">
                    ${farm.jobs.slice().sort((a, b) => new Date(b.scheduledDate || b.dateSubmitted || 0) - new Date(a.scheduledDate || a.dateSubmitted || 0)).map(j => `
                        <div class="farm-job-row" onclick="closeFarmProfileModal(); viewJob('${j.id}')">
                            <span class="id">${j.id}</span>
                            <span class="meta">${j.scheduledDate ? formatDate(j.scheduledDate) : 'No scheduled date'} • ${Math.round((j.fields || []).reduce((sum, f) => sum + (parseFloat(f.fieldSize) || 0), 0) * 100) / 100} acres</span>
                            <span class="status ${j._status}">${j._status.replace('_', ' ')}</span>
                        </div>`).join('')}
                </div>
            </div>
        </div>`;
    
    document.getElementById('farmProfileModal').classList.add('active');
    
    document.querySelectorAll('#farmProfileContent .farm-photo-thumb[data-key]').forEach(async el => {
        const key = el.dataset.key;
        if (!key) { el.innerHTML = '<span>—</span>'; return; }
        const url = await getJobPhotoDisplayUrl(key);
        if (url) {
            el.innerHTML = `<img src="${url}" alt="Field photo">`;
        } else {
            el.innerHTML = '<span>—</span>';
        }
    });
    
    initFarmProfileMap(farm, mapped);
}

// Initialize the Leaflet map inside the farm profile modal
function initFarmProfileMap(farm, mapped) {
    const el = document.getElementById('farmProfileMap');
    if (!el) return;
    if (farmProfileMap) {
        farmProfileMap.remove();
        farmProfileMap = null;
    }
    if (!mapped.length) {
        el.innerHTML = '<div class="farm-map-empty">No GPS coordinates recorded for this farm</div>';
        return;
    }
    const firstCoords = parseFieldCoords(mapped[0].fieldLocation).slice(1, 3).map(Number);
    farmProfileMap = L.map('farmProfileMap').setView(firstCoords, 12);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(farmProfileMap);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Labels &copy; Esri'
    }).addTo(farmProfileMap);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Roads &copy; Esri'
    }).addTo(farmProfileMap);
    farmProfileMarkers = [];
    const bounds = [];
    mapped.forEach(field => {
        const c = parseFieldCoords(field.fieldLocation).slice(1, 3).map(Number);
        const marker = L.marker(c).addTo(farmProfileMap).bindPopup(`<b>${escapeHtml(field.fieldName || 'Field')}</b><br>${field.fieldSize || '—'} acres${field.cropType ? ' • ' + escapeHtml(field.cropType) : ''}`);
        farmProfileMarkers.push({ latlng: c, marker });
        bounds.push(c);
    });
    if (bounds.length > 1) farmProfileMap.fitBounds(bounds, { padding: [30, 30] });
    setTimeout(() => farmProfileMap.invalidateSize(), 50);
}

// Scroll to the farm map and zoom into a specific field
function focusFarmField(el) {
    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);
    if (isNaN(lat) || isNaN(lng) || !farmProfileMap) return;
    document.getElementById('farmProfileMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
        farmProfileMap.setView([lat, lng], 16);
        const match = farmProfileMarkers.find(m => Math.abs(m.latlng[0] - lat) < 1e-6 && Math.abs(m.latlng[1] - lng) < 1e-6);
        if (match) match.marker.openPopup();
    }, 400);
}

// Close the farm profile detail modal
function closeFarmProfileModal() {
    document.getElementById('farmProfileModal').classList.remove('active');
    farmProfileMarkers = [];
    if (farmProfileMap) {
        farmProfileMap.remove();
        farmProfileMap = null;
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('farmProfileModal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        closeFarmProfileModal();
    }
});

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

// ============================================
// FIELD CALENDAR (for optimal dates in new app & edit job)
// ============================================

let fieldCalendarCallback = null;
let fieldCalendarDate = new Date();
let fieldCalendarAllowPast = false;

function openFieldCalendar(callback, allowPast) {
    fieldCalendarCallback = callback;
    fieldCalendarAllowPast = !!allowPast;
    fieldCalendarDate = new Date();
    let modal = document.getElementById('fieldCalendarModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fieldCalendarModal';
        modal.className = 'calendar-modal';
        modal.innerHTML = `
            <div class="calendar-modal-content">
                <div class="calendar-header">
                    <button class="calendar-nav" onclick="changeFieldMonth(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <h3 id="fieldCalendarTitle"></h3>
                    <button class="calendar-nav" onclick="changeFieldMonth(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <button class="calendar-close" onclick="closeFieldCalendar()">&times;</button>
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
                <div id="fieldCalendarDays" class="calendar-days"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    renderFieldCalendar();
    modal.classList.add('active');
}

function closeFieldCalendar() {
    const modal = document.getElementById('fieldCalendarModal');
    if (modal) modal.classList.remove('active');
    fieldCalendarCallback = null;
}

function renderFieldCalendar() {
    const year = fieldCalendarDate.getFullYear();
    const month = fieldCalendarDate.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('fieldCalendarTitle').textContent = `${monthNames[month]} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    let html = '';
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const blocked = isPast && !fieldCalendarAllowPast;
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${blocked ? 'past' : ''}"
                 onclick="${!blocked ? `selectFieldDate('${dateStr}')` : ''}">
                ${day}
            </div>
        `;
    }
    document.getElementById('fieldCalendarDays').innerHTML = html;
}

function changeFieldMonth(delta) {
    fieldCalendarDate.setMonth(fieldCalendarDate.getMonth() + delta);
    renderFieldCalendar();
}

function selectFieldDate(dateStr) {
    if (fieldCalendarCallback) {
        fieldCalendarCallback(dateStr);
    }
    closeFieldCalendar();
}

// Override updateApplicationStatus to create job when approved
const originalUpdateApplicationStatus = updateApplicationStatus;
async function updateApplicationStatusWithJob(status) {
    if (!currentApplicationId) return;
    
    console.log('Updating application status:', currentApplicationId, status);
    
    try {
        // Update the application status - Lambda handles job creation when approved
        const response = await fetchWithTimeout(`${API_BASE_URL}/applications/${currentApplicationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        }, 30000);
        
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Result:', result);
        
        if (response.ok) {
            // Refresh applications and jobs lists
            clearCache('applications');
            clearCache('jobs');
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

// ============================================
// END JOBS MANAGEMENT
// ============================================

// Document Management System (S3-backed)
let documents = [];
let categories = [];

async function fetchDocuments() {
    const grid = document.getElementById('documentsGrid');
    const cached = getCache('documents');
    if (cached) {
        documents = cached.documents || [];
        categories = cached.categories || [];
        updateCategoryFilter();
        renderDocuments();
    } else if (grid) {
        grid.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#6b7280;font-style:italic;">Loading documents...</div>';
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/documents`);
        if (response.ok) {
            const data = await response.json();
            documents = data.documents || [];
            categories = data.categories || [];
            setCache('documents', { documents, categories });
            updateCategoryFilter();
            renderDocuments();
        } else {
            console.error('Error fetching documents:', response.status);
            if (!cached && grid) {
                grid.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#ef4444;">Error loading documents.</div>';
            }
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
        if (!cached && grid) {
            grid.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#ef4444;">Error loading documents. Check your connection.</div>';
        }
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
                await fetchWithTimeout(`${API_BASE_URL}/documents/categories`, {
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
            await fetchWithTimeout(`${API_BASE_URL}/documents/categories`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: newCategories })
            });
            categories = newCategories;
            updateCategoryList();
            updateCategoryFilter();
            clearCache('documents');
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/documents/${id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.downloadUrl) {
                window.open(data.downloadUrl, '_blank');
            }
        } else {
            console.error('Error viewing document:', response.status);
        }
    } catch (error) {
        console.error('Error viewing document:', error);
    }
}

async function downloadDocument(id) {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/documents/${id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.downloadUrl) {
                const a = document.createElement('a');
                a.href = data.downloadUrl;
                a.download = data.name;
                a.click();
            }
        } else {
            console.error('Error downloading document:', response.status);
        }
    } catch (error) {
        console.error('Error downloading document:', error);
    }
}

async function deleteDocument(id) {
    if (confirm('Are you sure you want to delete this document?')) {
        try {
            await fetchWithTimeout(`${API_BASE_URL}/documents/${id}`, {
                method: 'DELETE'
            });
            clearCache('documents');
            await fetchDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }
}

async function changeDocumentCategory(docId, newCategory) {
    try {
        await fetchWithTimeout(`${API_BASE_URL}/documents/${docId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: newCategory })
        });
        clearCache('documents');
        await fetchDocuments();
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

async function handleFileUpload(files) {
    console.log('handleFileUpload called', files);
    for (const file of Array.from(files)) {
        try {
            const response = await fetchWithTimeout(`${API_BASE_URL}/documents`, {
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
            
            await fetchWithTimeout(`${API_BASE_URL}/documents/confirm`, {
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
            
            clearCache('documents');
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
    { key: 'crop', label: 'Crop', type: 'text' },
    { key: 'rateRange', label: 'Rate Range', type: 'text' },
    { key: 'rateUnit', label: 'Rate Unit', type: 'select', options: ['fl oz/acre', 'oz/acre', 'pt/acre', 'qt/acre', 'gal/acre', 'lb/acre', '% v/v'] },
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'verified', label: 'Verified', type: 'verified' }
];

async function initChemicalListPage() {
    const cached = getCache('chemicals_list');
    if (cached) {
        chemicalColumns = cached.columns;
        chemicalDB = cached.chemicalDB;
        chemicalsDB = JSON.parse(JSON.stringify(chemicalDB));
        renderChemicalManagerTable();
    } else {
        const tbody = document.getElementById('chemicalManagerTableBody');
        if (tbody) tbody.innerHTML = loadingRow(chemicalColumns.length);
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/chemicals`);
        if (response.ok) {
            const data = await response.json();
            
            // Load columns from API
            if (data.columns && data.columns.length > 0) {
                chemicalColumns = data.columns;
                const rateUnitCol = chemicalColumns.find(c => c.key === 'rateUnit');
                if (rateUnitCol && rateUnitCol.options) {
                    if (!rateUnitCol.options.includes('% v/v')) {
                        rateUnitCol.options = ['fl oz/acre', 'oz/acre', 'pt/acre', 'qt/acre', 'gal/acre', 'lb/acre', '% v/v'];
                    }
                }
            }
            
            // Load chemicals
            chemicalDB = (data.chemicals || []).map(c => {
                if (!c.id) c.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
                return c;
            });
            
            // Also update global chemicalsDB for calculator
            chemicalsDB = JSON.parse(JSON.stringify(chemicalDB));
            
            setCache('chemicals_list', { columns: chemicalColumns, chemicalDB: chemicalDB });
        } else {
            console.error('Error loading chemicals:', response.status);
        }
        renderChemicalManagerTable();
    } catch (error) {
        console.error('Error loading chemicals:', error);
        if (!cached) {
            chemicalDB = [];
            renderChemicalManagerTable();
        }
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
                            onchange="updateChemField('${chem.id}', '${col.key}', this.value)">
                    </td>
                `;
            } else if (col.type === 'select') {
                const value = chem[col.key] || '';
                rowHtml += `
                    <td>
                        <select onchange="updateChemField('${chem.id}', '${col.key}', this.value)">
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
                            onclick="toggleVerified('${chem.id}')">
                            ${isVerified ? 'Verified' : 'Unverified'}
                        </button>
                    </td>
                `;
            }
        });
        rowHtml += `
            <td>
                <button class="delete-row-btn" onclick="deleteChemRow('${chem.id}')" title="Delete">&times;</button>
            </td>
        </tr>`;
        return rowHtml;
    }).join('');
}

// ============================================
// NEW APPLICATION REQUEST MODAL
// ============================================

let newAppFieldCount = 1;
const selectedNewAppChemicals = {};
let newAppNameLookup = [];
let newAppNameMatches = [];

function buildNameLookup() {
    const seen = {};
    newAppNameLookup = [];
    for (const j of jobs) {
        const name = (j.fullName || '').trim();
        if (name && !seen[name]) {
            seen[name] = true;
            newAppNameLookup.push({
                name: name,
                phone: j.phone || '',
                email: j.email || '',
                address: j.address || '',
                city: j.city || '',
                state: j.state || '',
                zip: j.zip || ''
            });
        }
    }
}

function newAppFilterNames(input) {
    const dropdown = document.getElementById('newApp_nameDropdown');
    if (!input || input.length < 1) { dropdown.style.display = 'none'; return; }
    const q = input.toLowerCase();
    newAppNameMatches = newAppNameLookup.filter(e => e.name.toLowerCase().includes(q));
    if (newAppNameMatches.length === 0) { dropdown.style.display = 'none'; return; }
    dropdown.innerHTML = newAppNameMatches.map((e, i) =>
        '<div class="chemical-option" onmousedown="newAppSelectName(' + i + ')" style="padding:10px 14px;cursor:pointer;font-size:0.9rem;border-bottom:1px solid var(--border-light);">' +
        '<strong>' + e.name + '</strong>' +
        (e.phone ? '<span style="display:block;font-size:0.8rem;color:var(--text-muted);">' + e.phone + (e.email ? ' &middot; ' + e.email : '') + '</span>' : '') +
        '</div>'
    ).join('');
    dropdown.style.display = 'block';
}

function newAppSelectName(index) {
    const e = newAppNameMatches[index];
    if (!e) return;
    document.getElementById('newApp_fullName').value = e.name;
    document.getElementById('newApp_phone').value = e.phone;
    document.getElementById('newApp_email').value = e.email;
    document.getElementById('newApp_address').value = e.address;
    document.getElementById('newApp_city').value = e.city;
    document.getElementById('newApp_state').value = e.state;
    document.getElementById('newApp_zip').value = e.zip;
    document.getElementById('newApp_nameDropdown').style.display = 'none';
}

function openNewApplicationModal() {
    newAppFieldCount = 1;
    buildNameLookup();
    Object.keys(selectedNewAppChemicals).forEach(k => delete selectedNewAppChemicals[k]);
    document.getElementById('newApplicationModal').classList.add('active');
    document.getElementById('newAppForm').reset();
    const fieldGroups = document.getElementById('newAppFieldGroups');
    fieldGroups.innerHTML = '';
    newAppAddFieldGroup();
}

function closeNewApplicationModal() {
    document.getElementById('newApplicationModal').classList.remove('active');
}

async function submitNewApplication(e) {
    e.preventDefault();
    const fieldGroups = document.querySelectorAll('#newAppFieldGroups .new-app-field-group');
    const fields = [];
    fieldGroups.forEach((group, index) => {
        const rawCropType = group.querySelector('[name="newApp_cropType[]"]')?.value || '';
        const cropType = rawCropType.charAt(0).toUpperCase() + rawCropType.slice(1);
        fields.push({
            fieldName: group.querySelector('[name="newApp_fieldName[]"]')?.value || '',
            fieldSize: group.querySelector('[name="newApp_fieldSize[]"]')?.value || '',
            fieldLocation: group.querySelector('[name="newApp_fieldLocation[]"]')?.value || '',
            cropType: cropType,
            optimalDate: group.querySelector('[name="newApp_optimalDate[]"]')?.value || '',
            chemicals: selectedNewAppChemicals[index] || []
        });
    });
    const formData = new FormData(e.target);
    const appData = {
        fullName: formData.get('newApp_fullName'),
        phone: formData.get('newApp_phone'),
        email: formData.get('newApp_email'),
        address: formData.get('newApp_address'),
        city: formData.get('newApp_city'),
        state: formData.get('newApp_state'),
        zip: formData.get('newApp_zip'),
        contactMethod: [formData.get('newApp_contactMethod_phone'), formData.get('newApp_contactMethod_email'), formData.get('newApp_contactMethod_text')].filter(Boolean).join(', '),
        fields: fields,
        message: formData.get('newApp_message')
    };
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Submitting...</span>';
    submitBtn.disabled = true;
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appData)
        });
        if (response.ok) {
            clearCache('applications');
            await fetchApplications();
            closeNewApplicationModal();
        } else {
            const result = await response.json();
            alert('Error submitting application: ' + (result.error || 'Server error. Please try again.'));
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        alert('There was an error submitting your application. Please try again.');
    }
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
}

function newAppAddFieldGroup() {
    const container = document.getElementById('newAppFieldGroups');
    const idx = newAppFieldCount;
    const div = document.createElement('div');
    div.className = 'new-app-field-group';
    div.dataset.fieldIndex = idx;
    div.innerHTML = `
        <div class="field-group-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-weight:600;color:var(--text-primary);font-size:1rem;">Field ${idx + 1}</span>
            ${idx > 0 ? '<button type="button" class="remove-field-btn" onclick="removeNewAppField(this)" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:1.2rem;">&times;</button>' : ''}
        </div>
        <div class="form-group">
            <label for="newApp_fieldName_${idx}">Field Name</label>
            <input type="text" id="newApp_fieldName_${idx}" name="newApp_fieldName[]" placeholder="e.g., North 40, South Field" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group">
                <label for="newApp_fieldSize_${idx}">Field Size (Estimate Acres) *</label>
                <input type="number" id="newApp_fieldSize_${idx}" name="newApp_fieldSize[]" required placeholder="500" min="1" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
            </div>
            <div class="form-group">
                <label for="newApp_fieldLocation_${idx}">Field Location (GPS Coordinates)</label>
                <div style="display:flex;gap:8px;">
                    <input type="text" id="newApp_fieldLocation_${idx}" name="newApp_fieldLocation[]" placeholder="e.g., 42.2975, -89.6438" readonly style="flex:1;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="openNewAppMapModal(${idx})" style="white-space:nowrap;">Locate on Map</button>
                </div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px;">
            <div class="form-group">
                <label for="newApp_cropType_${idx}">Crop Type *</label>
                <select id="newApp_cropType_${idx}" name="newApp_cropType[]" required style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;">
                    <option value="">Select crop type</option>
                    <option value="corn">Corn</option>
                    <option value="soybeans">Soybeans</option>
                    <option value="wheat">Wheat</option>
                    <option value="alfalfa">Alfalfa</option>
                    <option value="weeds">Weeds</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="newApp_optimalDate_${idx}">Optimal Application Date</label>
                <div style="position:relative;display:flex;align-items:center;">
                    <input type="text" id="newApp_optimalDate_${idx}" name="newApp_optimalDate[]" placeholder="Click to select date" readonly onclick="openNewAppCalendar(${idx})" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;cursor:pointer;box-sizing:border-box;">
                </div>
            </div>
        </div>
        <div class="form-group" style="margin-top:12px;">
            <label>Chemicals / Pesticides</label>
            <div class="chemical-selector">
                <div class="chemical-input-wrapper">
                    <input type="text" id="newApp_chemSearch_${idx}" class="chemical-search" placeholder="Search chemicals..." oninput="newAppFilterChemicals(${idx})" onfocus="newAppShowDropdown(${idx})" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                    <div class="chemical-dropdown" id="newApp_chemDropdown_${idx}" style="position:absolute;top:100%;left:0;right:0;z-index:100;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;max-height:200px;overflow-y:auto;display:none;box-shadow:var(--shadow-lg);">
                        <div class="chemical-options" id="newApp_chemOptions_${idx}"></div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="newAppAddChemical(${idx})" style="white-space:nowrap;">Add</button>
            </div>
            <div id="newApp_customChemical_${idx}" style="display:none;margin-top:8px;display:none;">
                <div style="display:flex;gap:8px;">
                    <input type="text" class="custom-chem-field" placeholder="Enter chemical name..." onkeypress="if(event.key==='Enter'){newAppSubmitCustomChemical(${idx});return false;}" style="flex:1;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;">
                    <button type="button" class="btn btn-primary btn-sm" onclick="newAppSubmitCustomChemical(${idx})">Confirm</button>
                </div>
            </div>
            <div class="selected-chemicals" id="newApp_selectedChemicals_${idx}" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;"></div>
        </div>
    `;
    container.appendChild(div);
    newAppFieldCount++;
    newAppUpdateFieldNumbers();
}

function removeNewAppField(btn) {
    btn.closest('.new-app-field-group').remove();
    newAppUpdateFieldNumbers();
}

function newAppUpdateFieldNumbers() {
    const groups = document.querySelectorAll('#newAppFieldGroups .new-app-field-group');
    groups.forEach((g, i) => {
        g.querySelector('.field-group-header span:first-child').textContent = `Field ${i + 1}`;
        g.dataset.fieldIndex = i;
    });
}

function newAppFilterChemicals(fieldIndex) {
    const searchInput = document.getElementById(`newApp_chemSearch_${fieldIndex}`);
    const optionsContainer = document.getElementById(`newApp_chemOptions_${fieldIndex}`);
    const searchTerm = searchInput.value.toLowerCase();
    let html = `<div class="chemical-option" onclick="newAppSelectChemical(${fieldIndex}, 'Other')">Other</div>`;
    const filtered = chemicalsDB.filter(chem => {
        const name = `${chem.brandName || ''} ${chem.chemName || ''}`.trim().toLowerCase();
        const type = (chem.category || '').toLowerCase();
        return name.includes(searchTerm) || type.includes(searchTerm);
    });
    const grouped = {};
    filtered.forEach(chem => {
        const type = chem.category || 'Other';
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(chem);
    });
    Object.keys(grouped).sort().forEach(type => {
        html += `<div class="chemical-type-header" style="padding:4px 10px;font-size:0.75rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;background:var(--bg-dark);">${type}</div>`;
        grouped[type].forEach(chem => {
            const name = `${chem.brandName || ''} ${chem.chemName || ''}`.trim();
            html += `<div class="chemical-option" onclick="newAppSelectChemical(${fieldIndex}, '${name.replace(/'/g, "\\'")}')" style="padding:8px 10px;cursor:pointer;transition:background 0.2s;font-size:0.9rem;">${name}</div>`;
        });
    });
    if (filtered.length === 0 && searchTerm.length > 0) {
        html += '<div class="chemical-no-results" style="padding:8px 10px;color:var(--text-muted);font-style:italic;">No chemicals found</div>';
    }
    optionsContainer.innerHTML = html;
}

function newAppShowDropdown(fieldIndex) {
    document.getElementById(`newApp_chemDropdown_${fieldIndex}`).style.display = 'block';
    newAppFilterChemicals(fieldIndex);
}

function newAppSelectChemical(fieldIndex, chemName) {
    const searchInput = document.getElementById(`newApp_chemSearch_${fieldIndex}`);
    const customChem = document.getElementById(`newApp_customChemical_${fieldIndex}`);
    if (chemName === 'Other') {
        searchInput.value = '';
        customChem.style.display = 'flex';
        customChem.querySelector('input').focus();
    } else {
        searchInput.value = chemName;
        customChem.style.display = 'none';
        customChem.querySelector('input').value = '';
    }
    document.getElementById(`newApp_chemDropdown_${fieldIndex}`).style.display = 'none';
}

function newAppAddChemical(fieldIndex) {
    const searchInput = document.getElementById(`newApp_chemSearch_${fieldIndex}`);
    const chemName = searchInput.value.trim();
    if (!chemName) return;
    if (chemName.toLowerCase() === 'other') {
        document.getElementById(`newApp_customChemical_${fieldIndex}`).style.display = 'flex';
        searchInput.value = '';
        return;
    }
    if (!selectedNewAppChemicals[fieldIndex]) selectedNewAppChemicals[fieldIndex] = [];
    if (selectedNewAppChemicals[fieldIndex].includes(chemName)) { searchInput.value = ''; return; }
    selectedNewAppChemicals[fieldIndex].push(chemName);
    newAppRenderSelectedChemicals(fieldIndex);
    searchInput.value = '';
}

function newAppSubmitCustomChemical(fieldIndex) {
    const customInput = document.querySelector(`#newApp_customChemical_${fieldIndex} .custom-chem-field`);
    const chemName = customInput.value.trim();
    if (!chemName) return;
    if (!selectedNewAppChemicals[fieldIndex]) selectedNewAppChemicals[fieldIndex] = [];
    if (selectedNewAppChemicals[fieldIndex].includes(chemName)) { customInput.value = ''; return; }
    selectedNewAppChemicals[fieldIndex].push(chemName);
    newAppRenderSelectedChemicals(fieldIndex);
    customInput.value = '';
    document.getElementById(`newApp_customChemical_${fieldIndex}`).style.display = 'none';
}

function newAppRemoveChemical(fieldIndex, chemName) {
    if (selectedNewAppChemicals[fieldIndex]) {
        selectedNewAppChemicals[fieldIndex] = selectedNewAppChemicals[fieldIndex].filter(c => c !== chemName);
        newAppRenderSelectedChemicals(fieldIndex);
    }
}

function newAppRenderSelectedChemicals(fieldIndex) {
    const container = document.getElementById(`newApp_selectedChemicals_${fieldIndex}`);
    const chemicals = selectedNewAppChemicals[fieldIndex] || [];
    container.innerHTML = chemicals.map(chem => {
        const chemData = chemicalsDB.find(c => `${c.brandName || ''} ${c.chemName || ''}`.trim() === chem);
        const type = chemData ? chemData.category : '';
        return '<span class="chemical-tag" data-type="' + type + '">' + chem + '<button type="button" onclick="newAppRemoveChemical(' + fieldIndex + ', \'' + chem.replace(/'/g, "\\'") + '\')">&times;</button></span>';
    }).join('');
}

function openNewAppCalendar(fieldIndex) {
    openFieldCalendar(function(dateStr) {
        document.getElementById(`newApp_optimalDate_${fieldIndex}`).value = dateStr;
    });
}

function openNewAppMapModal(fieldIndex) {
    const input = document.getElementById(`newApp_fieldLocation_${fieldIndex}`);
    mapModalTargetInput = input;
    document.getElementById('fieldMapModal').classList.add('active');
    const modalTitle = document.querySelector('#fieldMapModal .map-modal-header h3');
    if (modalTitle) modalTitle.textContent = 'Locate Your Field';
    if (!editFieldMapInitialized) {
        initEditFieldMap();
    }
    editFieldMap.setView([42.2975, -89.6438], 10);
    if (editFieldMarker) {
        editFieldMap.removeLayer(editFieldMarker);
        editFieldMarker = null;
    }
    setTimeout(() => editFieldMap.invalidateSize(), 100);
}

const newApplicationModalHTML = `
    <div class="modal-overlay" id="newApplicationModal">
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>New Application Request</h3>
                <button class="modal-close" onclick="closeNewApplicationModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="newAppForm" onsubmit="submitNewApplication(event)">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div class="form-group" style="position:relative;">
                            <label for="newApp_fullName">Full Name *</label>
                            <input type="text" id="newApp_fullName" name="newApp_fullName" required placeholder="John Smith" autocomplete="off" oninput="newAppFilterNames(this.value)" onblur="setTimeout(function(){var d=document.getElementById('newApp_nameDropdown');if(d)d.style.display='none';},200)" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                            <div id="newApp_nameDropdown" style="position:absolute;top:100%;left:0;right:0;z-index:200;background:var(--bg-card);border:1px solid var(--border);border-radius:0 0 8px 8px;max-height:200px;overflow-y:auto;display:none;box-shadow:var(--shadow-lg);"></div>
                        </div>
                        <div class="form-group">
                            <label for="newApp_phone">Phone Number *</label>
                            <input type="tel" id="newApp_phone" name="newApp_phone" required placeholder="(555) 123-4567" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                        </div>
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                        <label for="newApp_email">Email Address *</label>
                        <input type="email" id="newApp_email" name="newApp_email" required placeholder="john@farm.com" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                        <label for="newApp_address">Billing Address *</label>
                        <input type="text" id="newApp_address" name="newApp_address" required placeholder="123 Main Street" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                        <div class="form-group">
                            <label for="newApp_city">City *</label>
                            <input type="text" id="newApp_city" name="newApp_city" required placeholder="Freeport" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                        </div>
                        <div class="form-group">
                            <label for="newApp_state">State *</label>
                            <select id="newApp_state" name="newApp_state" required style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;">
                                <option value="">Select state</option>
                                <option value="IL">Illinois</option>
                                <option value="WI">Wisconsin</option>
                                <option value="IA">Iowa</option>
                                <option value="IN">Indiana</option>
                                <option value="MO">Missouri</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                        <label for="newApp_zip">ZIP Code *</label>
                        <input type="text" id="newApp_zip" name="newApp_zip" required placeholder="61032" pattern="[0-9]{5}" maxlength="5" style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                        <label>Preferred Contact Method *</label>
                        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:8px;">
                            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9rem;color:var(--text-primary);">
                                <input type="checkbox" name="newApp_contactMethod_phone" value="phone" style="width:auto;">
                                <span>Phone Call</span>
                            </label>
                            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9rem;color:var(--text-primary);">
                                <input type="checkbox" name="newApp_contactMethod_email" value="email" style="width:auto;">
                                <span>Email</span>
                            </label>
                            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9rem;color:var(--text-primary);">
                                <input type="checkbox" name="newApp_contactMethod_text" value="text" style="width:auto;">
                                <span>Text Message</span>
                            </label>
                        </div>
                    </div>
                    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border-light);">
                        <h3 style="font-size:1.1rem;font-weight:600;color:var(--text-primary);margin:0 0 4px 0;">Field Information</h3>
                        <p style="font-size:0.85rem;color:var(--text-secondary);margin:0 0 16px 0;">Nobody knows your fields better than you do. Select the chemicals you want applied — we'll handle the precision application.</p>
                        <div id="newAppFieldGroups"></div>
                        <button type="button" class="btn btn-secondary" onclick="newAppAddFieldGroup()" style="margin-top:12px;display:inline-flex;align-items:center;gap:6px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Add Another Field
                        </button>
                    </div>
                    <div class="form-group" style="margin-top:20px;">
                        <label for="newApp_message">Additional Information</label>
                        <textarea id="newApp_message" name="newApp_message" rows="4" placeholder="Provide any additional information or questions you may have..." style="width:100%;padding:10px 14px;border:1px solid var(--border-light);border-radius:8px;background:var(--bg-card);color:var(--text-primary);font-size:0.95rem;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
                    </div>
                    <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px;padding-top:16px;border-top:1px solid var(--border-light);">
                        <button type="button" class="btn btn-secondary" onclick="closeNewApplicationModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;">
                            <span>Submit Application</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', newApplicationModalHTML);

// Add Chemical Modal
const addChemicalModalHTML = `
    <div class="modal-overlay" id="addChemicalModal">
        <div class="modal-content" style="max-width: 550px;">
            <div class="modal-header">
                <h3>Add Chemical</h3>
                <button class="modal-close" onclick="closeAddChemicalModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="display: grid; gap: 16px;">
                    <div class="form-group">
                        <label>Brand Name</label>
                        <input type="text" id="addChemBrandName" placeholder="e.g. BASF, Syngenta" autocomplete="off" onfocus="showBrandSuggestions(this)" oninput="filterBrandSuggestions(this)">
                    </div>
                    <div class="form-group">
                        <label>Chemical Name</label>
                        <input type="text" id="addChemName" placeholder="e.g. Veltyma, Miravis Neo">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="addChemCategory">
                            <option value="">Select category...</option>
                            <option value="Herbicide">Herbicide</option>
                            <option value="Insecticide">Insecticide</option>
                            <option value="Fungicide">Fungicide</option>
                            <option value="Adjuvant">Adjuvant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Crop</label>
                        <input type="text" id="addChemCrop" placeholder="e.g. Corn, Soybeans, Wheat" autocomplete="off" onfocus="showCropSuggestions(this)" oninput="filterCropSuggestions(this)">
                    </div>
                    <div class="form-group">
                        <label>Rate Range</label>
                        <input type="text" id="addChemRateRange" placeholder="e.g. 32 or 16 - 64">
                    </div>
                    <div class="form-group">
                        <label>Rate Unit</label>
                        <select id="addChemRateUnit">
                            <option value="fl oz/acre">fl oz/acre</option>
                            <option value="oz/acre">oz/acre</option>
                            <option value="pt/acre">pt/acre</option>
                            <option value="qt/acre">qt/acre</option>
                            <option value="gal/acre">gal/acre</option>
                            <option value="lb/acre">lb/acre</option>
                            <option value="% v/v">% v/v</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Label</label>
                        <input type="text" id="addChemLabel" placeholder="Product label URL (optional)">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeAddChemicalModal()">Cancel</button>
                <button class="btn btn-primary" onclick="confirmAddChemical()">Add Chemical</button>
            </div>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', addChemicalModalHTML);

function addChemicalManagerRow() {
    document.getElementById('addChemBrandName').value = '';
    document.getElementById('addChemName').value = '';
    document.getElementById('addChemCategory').value = '';
    document.getElementById('addChemCrop').value = '';
    document.getElementById('addChemRateRange').value = '';
    document.getElementById('addChemRateUnit').value = 'fl oz/acre';
    document.getElementById('addChemLabel').value = '';
    document.getElementById('addChemicalModal').classList.add('active');
}

function closeAddChemicalModal() {
    document.getElementById('addChemicalModal').classList.remove('active');
    hideAutocomplete();
}

async function confirmAddChemical() {
    const brandName = document.getElementById('addChemBrandName').value.trim();
    const chemName = document.getElementById('addChemName').value.trim();
    const category = document.getElementById('addChemCategory').value;
    const crop = document.getElementById('addChemCrop').value.trim();
    const rateRange = document.getElementById('addChemRateRange').value.trim();
    const rateUnit = document.getElementById('addChemRateUnit').value;
    const label = document.getElementById('addChemLabel').value.trim();

    if (!brandName && !chemName) {
        alert('Please enter at least a Brand Name or Chemical Name.');
        return;
    }

    const newChem = { verified: false };
    chemicalColumns.forEach(col => {
        if (col.key === 'verified') return;
        if (col.key === 'brandName') newChem[col.key] = brandName;
        else if (col.key === 'chemName') newChem[col.key] = chemName;
        else if (col.key === 'category') newChem[col.key] = category;
        else if (col.key === 'crop') newChem[col.key] = crop;
        else if (col.key === 'rateRange') newChem[col.key] = rateRange;
        else if (col.key === 'rateUnit') newChem[col.key] = rateUnit;
        else if (col.key === 'label') newChem[col.key] = label;
        else newChem[col.key] = '';
    });
    newChem.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    chemicalDB.push(newChem);
    renderChemicalManagerTable();
    closeAddChemicalModal();
    await saveChemicals();
}

// Autocomplete helpers for Add Chemical modal
var autocompleteDropdown = null;

function initAutocompleteDropdown() {
    if (autocompleteDropdown) return;
    autocompleteDropdown = document.createElement('div');
    autocompleteDropdown.className = 'chemical-dropdown';
    autocompleteDropdown.style.cssText = 'position:fixed;z-index:10000;display:none;';
    document.body.appendChild(autocompleteDropdown);
    
    autocompleteDropdown.addEventListener('click', function(e) {
        var item = e.target.closest('.chemical-option');
        if (!item) return;
        var inputId = autocompleteDropdown.dataset.inputId;
        if (inputId) {
            document.getElementById(inputId).value = item.textContent;
        }
        autocompleteDropdown.style.display = 'none';
    });
}

function getUniqueChemicalValues(key) {
    var values = {};
    chemicalDB.forEach(function(c) {
        var v = (c[key] || '').trim();
        if (v) values[v] = true;
    });
    return Object.keys(values).sort();
}

function showAutocomplete(input, key) {
    initAutocompleteDropdown();
    var items = getUniqueChemicalValues(key);
    var searchTerm = input.value;
    
    var html = '';
    items.forEach(function(item) {
        var lower = item.toLowerCase();
        var term = (searchTerm || '').toLowerCase();
        if (!term || lower.indexOf(term) !== -1) {
            html += '<div class="chemical-option">' + item + '</div>';
        }
    });
    if (!html) {
        html = '<div class="chemical-no-results">No matches found</div>';
    }
    
    autocompleteDropdown.innerHTML = html;
    autocompleteDropdown.dataset.inputId = input.id;
    
    var rect = input.getBoundingClientRect();
    autocompleteDropdown.style.top = (rect.bottom + 4) + 'px';
    autocompleteDropdown.style.left = rect.left + 'px';
    autocompleteDropdown.style.width = rect.width + 'px';
    autocompleteDropdown.style.display = 'block';
}

function hideAutocomplete() {
    if (autocompleteDropdown) {
        autocompleteDropdown.style.display = 'none';
    }
}

function showBrandSuggestions(input) {
    showAutocomplete(input, 'brandName');
}

function filterBrandSuggestions(input) {
    showAutocomplete(input, 'brandName');
}

function showCropSuggestions(input) {
    showAutocomplete(input, 'crop');
}

function filterCropSuggestions(input) {
    showAutocomplete(input, 'crop');
}

// Close autocomplete dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!autocompleteDropdown) return;
    if (autocompleteDropdown.style.display === 'none') return;
    if (autocompleteDropdown.contains(e.target)) return;
    var inputId = autocompleteDropdown.dataset.inputId;
    if (inputId) {
        var input = document.getElementById(inputId);
        if (input && input.contains(e.target)) return;
    }
    autocompleteDropdown.style.display = 'none';
});

async function deleteChemRow(id) {
    const index = chemicalDB.findIndex(c => c.id === id);
    if (index === -1) return;
    if (confirm('Delete this chemical?')) {
        chemicalDB.splice(index, 1);
        renderChemicalManagerTable();
        await saveChemicals();
    }
}

function updateChemField(id, key, value) {
    const index = chemicalDB.findIndex(c => c.id === id);
    if (index !== -1) chemicalDB[index][key] = value;
}

function toggleVerified(id) {
    const index = chemicalDB.findIndex(c => c.id === id);
    if (index !== -1) {
        chemicalDB[index].verified = !chemicalDB[index].verified;
        renderChemicalManagerTable();
    }
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
        const response = await fetchWithTimeout(`${API_BASE_URL}/chemicals`, {
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
            clearCache('chemicals_list');
            clearCache('chemicals_calc');
            
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
fetchChemicalsForCalculator();

// Chemical Calculator Functions
let chemicalRowCount = 1;
let chemicalsDB = []; // Chemical database from API

// Fetch chemicals from API on page load
async function fetchChemicalsForCalculator() {
    const cached = getCache('chemicals_calc');
    if (cached) {
        chemicalsDB = cached;
        buildChemicalDropdownOptions();
    }
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/chemicals`);
        if (response.ok) {
            const data = await response.json();
            chemicalsDB = data.chemicals || [];
            setCache('chemicals_calc', chemicalsDB);
        } else {
            console.error('Error fetching chemicals:', response.status);
            if (!cached) chemicalsDB = getDefaultChemicals();
        }
        buildChemicalDropdownOptions();
    } catch (error) {
        console.error('Error fetching chemicals:', error);
        if (!cached) chemicalsDB = getDefaultChemicals();
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
function openCalculatorWithField(fieldSize, chemicals, chemicalRates, chemicalRateUnits) {
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
            fillChemicalsInCalculator(chemicals, chemicalRates, chemicalRateUnits);
        } else {
            // Wait for chemicals to load
            fetchChemicalsForCalculator().then(() => {
                fillChemicalsInCalculator(chemicals, chemicalRates, chemicalRateUnits);
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
function fillChemicalsInCalculator(chemicals, chemicalRates, chemicalRateUnits) {
    const tbody = document.getElementById('fieldChemicalsBody');
    
    chemicals.forEach((chemName, index) => {
        const chem = findChemicalMatch(chemName);
        const jobRate = (chemicalRates && chemicalRates[index]) || '';
        const jobUnit = (chemicalRateUnits && chemicalRateUnits[index]) || '';
        
        function applyRateAndUnit(row) {
            const labelRateInput = row.querySelector('.label-rate');
            if (jobRate) {
                labelRateInput.value = jobRate;
            } else if (chem && chem.rateRange) {
                labelRateInput.value = chem.rateRange;
            }
            if (jobUnit) {
                let unitValue = jobUnit;
                row.querySelector('.rate-unit').value = unitValue;
            } else if (chem && chem.rateUnit) {
                let unitValue = chem.rateUnit.replace('/acre', '');
                if (unitValue === '% v/v') unitValue = 'vv';
                row.querySelector('.rate-unit').value = unitValue;
            }
            if (labelRateInput.value) {
                calculateChemicalVolume(labelRateInput);
            }
        }
        
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
            } else {
                // No match - add as custom
                input.value = chemName;
                input.dataset.selectedId = '';
                customInput.style.display = 'none';
            }
            applyRateAndUnit(firstRow);
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
                } else {
                    // No match - add as custom
                    input.value = chemName;
                    input.dataset.selectedId = '';
                    customInput.style.display = 'none';
                }
                applyRateAndUnit(newRow);
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
    if (!e.target.closest('.chemical-search-wrapper') && !e.target.closest('#editJobModal') && !e.target.closest('#newApplicationModal')) {
        document.querySelectorAll('.chemical-dropdown').forEach(dropdown => {
            if (!dropdown.closest('#editJobModal') && !dropdown.closest('#newApplicationModal')) {
                dropdown.style.display = 'none';
            }
        });
    }
});

// Close new app modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay') && e.target.id === 'newApplicationModal') {
        closeNewApplicationModal();
    }
});

// Close field calendar on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('calendar-modal') && e.target.id === 'fieldCalendarModal') {
        closeFieldCalendar();
    }
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const newAppModal = document.getElementById('newApplicationModal');
        if (newAppModal && newAppModal.classList.contains('active')) {
            closeNewApplicationModal();
        }
        const fieldCal = document.getElementById('fieldCalendarModal');
        if (fieldCal && fieldCal.classList.contains('active')) {
            closeFieldCalendar();
        }
    }
});