/**
 * Helper utility to load the Google Picker API and launch the file picker.
 */

export function loadPickerScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If google.picker is already loaded, resolve immediately
    if ((window as any).google?.picker) {
      resolve();
      return;
    }

    // Load the Google API Client library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const gapi = (window as any).gapi;
      if (gapi) {
        gapi.load('picker', {
          callback: () => {
            resolve();
          },
          onerror: () => {
            reject(new Error('Failed to load Google Picker via gapi.load'));
          }
        });
      } else {
        reject(new Error('Google API Client (gapi) was not found after script loaded'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Google API Client (api.js) script'));
    };
    document.body.appendChild(script);
  });
}

interface SelectedFile {
  name: string;
  url: string;
  id: string;
}

export function openPicker(
  accessToken: string,
  onSelect: (file: SelectedFile) => void,
  onCancel?: () => void
) {
  const google = (window as any).google;
  if (!google || !google.picker) {
    console.error('Google Picker SDK not fully loaded on window');
    return;
  }

  // Set picker origin properly to work within iframe preview sandbox or top window
  const pickerOrigin =
    window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  // Show all document types
  const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
    .setMimeTypes(
      'image/*,application/pdf,application/vnd.google-apps.document,' +
      'application/vnd.google-apps.spreadsheet,application/vnd.google-apps.presentation,' +
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

  try {
    const picker = new google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(accessToken)
      .setOrigin(pickerOrigin)
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const doc = data.docs[0];
          onSelect({
            name: doc.name || 'Unnamed File',
            url: doc.url || `https://drive.google.com/file/d/${doc.id}/view`,
            id: doc.id,
          });
        } else if (data.action === google.picker.Action.CANCEL) {
          if (onCancel) onCancel();
        }
      })
      .build();

    picker.setVisible(true);
  } catch (error) {
    console.error('Error building or opening Google Picker:', error);
  }
}
