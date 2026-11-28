using System;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

internal static class Program
{
    private const string AppHost = "grade6review.appassets.example";

    [STAThread]
    private static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        string contentPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "AppContent");
        string dataPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Grade6Review115", "WebView2");

        var form = new Form
        {
            Text = "複習小島｜六上期末冒險",
            StartPosition = FormStartPosition.CenterScreen,
            Width = 1280,
            Height = 900,
            MinimumSize = new System.Drawing.Size(760, 600)
        };
        var browser = new WebView2 { Dock = DockStyle.Fill };
        form.Controls.Add(browser);
        form.Shown += async delegate { await StartApp(form, browser, contentPath, dataPath); };
        Application.Run(form);
    }

    private static async Task StartApp(Form form, WebView2 browser, string contentPath, string dataPath)
    {
        try
        {
            if (!File.Exists(Path.Combine(contentPath, "grade6-final-offline.html")))
                throw new FileNotFoundException("找不到 APP 內的期末教學檔案。");

            Directory.CreateDirectory(dataPath);
            CoreWebView2Environment environment = await CoreWebView2Environment.CreateAsync(null, dataPath);
            await browser.EnsureCoreWebView2Async(environment);

            CoreWebView2 core = browser.CoreWebView2;
            core.Settings.AreDefaultContextMenusEnabled = false;
            core.Settings.AreDevToolsEnabled = false;
            core.Settings.IsStatusBarEnabled = false;
            core.SetVirtualHostNameToFolderMapping(
                AppHost, contentPath, CoreWebView2HostResourceAccessKind.DenyCors);
            core.NavigationStarting += delegate(object sender, CoreWebView2NavigationStartingEventArgs args)
            {
                Uri target;
                if (!Uri.TryCreate(args.Uri, UriKind.Absolute, out target) ||
                    target.Scheme != Uri.UriSchemeHttps || target.Host != AppHost)
                    args.Cancel = true;
            };
            core.NewWindowRequested += delegate(object sender, CoreWebView2NewWindowRequestedEventArgs args)
            {
                args.Handled = true;
            };
            browser.Source = new Uri("https://" + AppHost + "/grade6-final-offline.html");
        }
        catch (Exception error)
        {
            form.Close();
            MessageBox.Show(
                "APP 無法啟動。請確認 Windows 已安裝 Microsoft Edge WebView2 Runtime。\n\n" + error.Message,
                "複習小島 APP", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
