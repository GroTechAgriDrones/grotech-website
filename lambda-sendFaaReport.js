import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'us-east-2' });
const FROM_EMAIL = process.env.FROM_EMAIL || 'grotechagridrones@gmail.com';
const TO_EMAIL = 'grotechagridrones@gmail.com';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        const data = JSON.parse(event.body);

        const subject = `44807 Monthly Report - ${data.proponentName} - ${data.reportMonth}`;

        const bodyText = generateReportText(data);
        const bodyHtml = generateReportHtml(data);

        const command = new SendEmailCommand({
            Source: FROM_EMAIL,
            Destination: {
                ToAddresses: [TO_EMAIL]
            },
            Message: {
                Subject: { Data: subject, Charset: 'UTF-8' },
                Body: {
                    Text: { Data: bodyText, Charset: 'UTF-8' },
                    Html: { Data: bodyHtml, Charset: 'UTF-8' }
                }
            }
        });

        await ses.send(command);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, message: 'Report sent to FAA' })
        };

    } catch (err) {
        console.error('Send report error:', err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: err.message })
        };
    }
};



function generateReportText(data) {
    const lines = [];
    lines.push('44807 MONTHLY REPORT');
    lines.push('====================');
    lines.push(`Proponent: ${data.proponentName}`);
    lines.push(`Report Month: ${data.reportMonth}`);
    if (data.aircraft && data.aircraft.length > 0) {
        lines.push('');
        lines.push('AIRCRAFT:');
        data.aircraft.forEach(function(ac) {
            lines.push(`  ${ac.name} — ${ac.model} (Reg: ${ac.registration}) — ${ac.flights} flights`);
        });
    }
    lines.push(`Negative Report: ${data.negativeReport}`);
    lines.push('');
    lines.push('FLIGHT SUMMARY');
    lines.push(`Total Flights: ${data.totalFlights}`);
    lines.push(`Total Hours: ${data.totalHours}`);
    lines.push('');
    lines.push('FLIGHT BREAKDOWN (per aircraft, per location):');
    if (data.flightBreakdown && data.flightBreakdown.length > 0) {
        data.flightBreakdown.forEach(function(b) {
            lines.push(`  ${b.aircraft} @ ${b.location}: ${b.flights} flights, ${b.hours} hours`);
        });
    }
    lines.push('');
    lines.push('OPERATING LOCATIONS:');
    if (data.locations && data.locations.length > 0) {
        data.locations.forEach(function(l) {
            lines.push(`  ${l.city} - Lat: ${l.latitude}, Long: ${l.longitude} (${l.flights} flights)`);
        });
    }
    lines.push('');
    lines.push('TAKEOFF/LANDING DAMAGE:');
    lines.push(`  Occurred: ${data.takeoffLandingDamage}`);
    if (data.takeoffLandingDamage === 'Yes') {
        lines.push(`  Description: ${data.takeoffLandingDamageDesc}`);
    }
    lines.push('');
    lines.push('EQUIPMENT MALFUNCTIONS:');
    if (data.equipmentMalfunctions && data.equipmentMalfunctions.length > 0) {
        data.equipmentMalfunctions.forEach(function(m) {
            if (m.count > 0) {
                lines.push(`  ${m.category}: ${m.count} occurrence(s)`);
                if (m.description) lines.push(`    Description: ${m.description}`);
            }
        });
        var anyMal = data.equipmentMalfunctions.some(function(m) { return m.count > 0; });
        if (!anyMal) lines.push('  None reported.');
    }
    lines.push('');
    lines.push('LOST LINK EVENTS:');
    lines.push(`  Count: ${data.lostLinkCount}`);
    lines.push(`  Total Duration (min): ${data.lostLinkDuration}`);
    lines.push(`  Type: ${data.lostLinkType}`);
    lines.push('');
    lines.push('INCIDENT/ACCIDENT/MISHAP:');
    lines.push(`  Occurred: ${data.incidentOccurred}`);
    if (data.incidentOccurred === 'Yes') {
        lines.push(`  Description: ${data.incidentDesc}`);
    }
    lines.push('');
    lines.push('---');
    lines.push('---');
    lines.push('This report is submitted in accordance with FAA COA AFS-25-00608-E, Section F.2.');
    return lines.join('\n');
}

function generateReportHtml(data) {
    var subject = escHtml(data.proponentName) + ' Monthly Report, ' + escHtml(data.reportMonth);
    var neg = data.negativeReport === 'yes';

    function sec(title, content) {
        return '<tr><td style="padding:20px 30px 4px 30px;font-size:16px;font-weight:700;color:#1a1a2e;" colspan="2">' + title + '</td></tr>' + content;
    }
    function r(label, value) {
        return '<tr><td style="padding:6px 30px 6px 40px;font-size:13px;color:#555;white-space:nowrap;vertical-align:top;width:220px;border-bottom:1px solid #eee;">' + label + '</td><td style="padding:6px 30px 6px 10px;font-size:13px;color:#333;border-bottom:1px solid #eee;">' + value + '</td></tr>';
    }

    var body = '';
    body += '<tr><td style="padding:20px 30px 0 30px;font-size:18px;font-weight:700;color:#1a1a2e;" colspan="2">Subject: ' + subject + '</td></tr>';
    body += '<tr><td style="padding:4px 30px 16px 30px;font-size:12px;color:#888;" colspan="2">To: 9-AVS-FS-AFS-700-Correspondence@faa.gov</td></tr>';

    body += sec('1. Proponent &amp; Aircraft Information',
        r('Proponent', escHtml(data.proponentName)) +
        (data.aircraft && data.aircraft.length > 0 ? data.aircraft.map(function(ac) {
            return r('Aircraft', escHtml(ac.name) + ' &mdash; ' + escHtml(ac.model) + ' (Reg: ' + escHtml(ac.registration) + ', ' + ac.flights + ' flights)');
        }).join('') : r('Aircraft', 'None specified'))
    );

    body += sec('2. Reporting Month', r('Month', escHtml(data.reportMonth)));

    body += sec('3. Operating Locations',
        (data.locations && data.locations.length > 0 ? data.locations.map(function(loc) {
            return r(escHtml(loc.city), 'Lat: ' + escHtml(loc.latitude) + ', Lng: ' + escHtml(loc.longitude) + ' (' + (loc.flights || 0) + ' flights)');
        }).join('') : r('Locations', 'None'))
    );

    body += sec('4. Flight Breakdown (per Location, per Aircraft)',
        (data.flightBreakdown && data.flightBreakdown.length > 0 ? data.flightBreakdown.map(function(bk) {
            return r(escHtml(bk.aircraft) + ' @ ' + escHtml(bk.location), bk.flights + ' flights, ' + bk.hours + ' hrs');
        }).join('') : r('Flights', 'None'))
    );

    body += sec('5. Totals',
        r('Total Flights', data.totalFlights) +
        r('Total Hours', data.totalHours.toFixed(1))
    );

    if (neg) {
        body += sec('6. Negative Report', r('Status', 'No operations were conducted this month.'));
    }

    body += sec('6. Takeoff &amp; Landing Damage',
        r('Damage Occurred', data.takeoffLandingDamage) +
        (data.takeoffLandingDamageDesc ? r('Description', escHtml(data.takeoffLandingDamageDesc)) : '')
    );

    var malHtml = '';
    if (data.equipmentMalfunctions && data.equipmentMalfunctions.length > 0) {
        data.equipmentMalfunctions.forEach(function(m) {
            if (m.count > 0 || m.description) {
                malHtml += r(escHtml(m.category), 'Count: ' + (m.count || 0) + (m.description ? ' &mdash; ' + escHtml(m.description) : ''));
            }
        });
    }
    if (!malHtml) malHtml = r('Malfunctions', 'None reported');
    body += sec('7. Equipment Malfunctions', malHtml);

    body += sec('8. Lost Link Events',
        r('Number of Events', data.lostLinkCount || 0) +
        r('Total Duration', (data.lostLinkDuration || 0) + ' min') +
        r('Type', escHtml(data.lostLinkType || 'N/A'))
    );

    body += sec('9. Incident/Accident/Mishap Reporting',
        r('Incident Occurred', data.incidentOccurred) +
        (data.incidentOccurred === 'Yes' && data.incidentDesc ? r('Description', escHtml(data.incidentDesc)) : '')
    );

    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + subject + '</title></head><body style="margin:0;padding:0;background:#f4f4f7;">' +
        '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;"><tr><td align="center" style="padding:30px 10px;">' +
        '<table width="700" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">' +
        '<tr><td style="padding:30px 30px 10px 30px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:12px 12px 0 0;">' +
        '<h1 style="margin:0;font-size:20px;font-weight:700;color:#4ade80;">44807 Monthly Report</h1>' +
        '<p style="margin:6px 0 0 0;font-size:12px;color:#888;">Blanket COA &bull; Grant of Exemption &bull; Class G Airspace at or below 400 ft AGL</p>' +
        '</td></tr>' +
        body +
        '<tr><td style="padding:24px 30px;border-top:2px solid #1a1a2e;font-size:11px;color:#999;text-align:center;" colspan="2">' +
        'This report is submitted in accordance with FAA COA AFS-25-00608-E, Section F.2.<br>' +
        'Generated by GroTech AgriDrones LLC &mdash; ' + escHtml(data.reportMonth) +
        '</td></tr></table></td></tr></table></body></html>';
}

function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
