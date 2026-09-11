using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Windows;
namespace BizX.Desktop;

[DataContract] public sealed class GameState { [DataMember] public long Score { get; set; } [DataMember] public long Xp { get; set; } [DataMember] public int Level { get; set; } = 1; }
public partial class MainWindow : Window {
    private GameState _state = new();
    private readonly string _path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "BizX", "save.json");
    public MainWindow() { InitializeComponent(); Directory.CreateDirectory(Path.GetDirectoryName(_path)!); Load(); Refresh(); }
    private void Refresh() { ScoreText.Text = _state.Score.ToString("N0"); XpText.Text = _state.Xp.ToString("N0"); LevelText.Text = _state.Level.ToString(); }
    private void Start_Click(object s, RoutedEventArgs e) { _state.Xp += 100; _state.Score += 250; if (_state.Xp >= _state.Level * 500) _state.Level++; Refresh(); }
    private void Save_Click(object s, RoutedEventArgs e) { Save(); MessageBox.Show("Game state saved.", "BizX", MessageBoxButton.OK, MessageBoxImage.Information); }
    private void Resume_Click(object s, RoutedEventArgs e) { Load(); Refresh(); }
    private void Hall_Click(object s, RoutedEventArgs e) { MessageBox.Show($"Current local score: {_state.Score:N0}\nHall of Fame storage is kept in the user profile.", "BizX"); }
    private void Save() { using var stream = File.Create(_path); new DataContractJsonSerializer(typeof(GameState)).WriteObject(stream, _state); }
    private void Load() { try { using var stream = File.OpenRead(_path); _state = (GameState)new DataContractJsonSerializer(typeof(GameState)).ReadObject(stream)!; } catch { _state = new(); } }
}
