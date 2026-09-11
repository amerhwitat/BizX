#define UNICODE
#define _UNICODE
#include <windows.h>
#include <shlobj.h>
#include <string>
#include <fstream>
#include <sstream>

struct GameState { long long score = 0; long long xp = 0; int level = 1; };
static GameState g_state;
static HWND g_status;

static std::wstring SavePath() {
    PWSTR folder = nullptr;
    SHGetKnownFolderPath(FOLDERID_LocalAppData, 0, nullptr, &folder);
    std::wstring path(folder ? folder : L".");
    if (folder) CoTaskMemFree(folder);
    path += L"\\BizX";
    CreateDirectoryW(path.c_str(), nullptr);
    return path + L"\\save.dat";
}

static void SaveGame() {
    std::ofstream out(SavePath(), std::ios::binary | std::ios::trunc);
    out << g_state.score << '\n' << g_state.xp << '\n' << g_state.level << '\n';
}

static void LoadGame() {
    std::ifstream in(SavePath(), std::ios::binary);
    if (!(in >> g_state.score >> g_state.xp >> g_state.level)) g_state = {};
}

static void Refresh() {
    std::wstringstream s;
    s << L"BizX Standalone Desktop\r\n\r\n"
      << L"Score: " << g_state.score << L"\r\n"
      << L"XP: " << g_state.xp << L"\r\n"
      << L"Level: " << g_state.level << L"\r\n\r\n"
      << L"Catalog: Access Pass, XP Boost, Inventory Expansion\r\n"
      << L"Architecture: native VC++ / Win32 / Unicode / standalone";
    SetWindowTextW(g_status, s.str().c_str());
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp) {
    switch (msg) {
    case WM_CREATE:
        g_status = CreateWindowW(L"STATIC", L"", WS_CHILD | WS_VISIBLE, 20, 20, 540, 220, hwnd, nullptr, nullptr, nullptr);
        CreateWindowW(L"BUTTON", L"Start / Add XP", WS_CHILD | WS_VISIBLE, 20, 255, 150, 35, hwnd, (HMENU)1, nullptr, nullptr);
        CreateWindowW(L"BUTTON", L"Save", WS_CHILD | WS_VISIBLE, 180, 255, 100, 35, hwnd, (HMENU)2, nullptr, nullptr);
        CreateWindowW(L"BUTTON", L"Resume", WS_CHILD | WS_VISIBLE, 290, 255, 100, 35, hwnd, (HMENU)3, nullptr, nullptr);
        CreateWindowW(L"BUTTON", L"Hall of Fame", WS_CHILD | WS_VISIBLE, 400, 255, 130, 35, hwnd, (HMENU)4, nullptr, nullptr);
        Refresh();
        return 0;
    case WM_COMMAND:
        switch (LOWORD(wp)) {
        case 1: g_state.xp += 100; g_state.score += 250; if (g_state.xp >= g_state.level * 500) ++g_state.level; Refresh(); break;
        case 2: SaveGame(); MessageBoxW(hwnd, L"Game state saved.", L"BizX", MB_OK | MB_ICONINFORMATION); break;
        case 3: LoadGame(); Refresh(); break;
        case 4: MessageBoxW(hwnd, L"Hall of Fame\r\nCurrent score: saved locally per user profile.", L"BizX", MB_OK); break;
        }
        return 0;
    case WM_DESTROY: SaveGame(); PostQuitMessage(0); return 0;
    }
    return DefWindowProcW(hwnd, msg, wp, lp);
}

int WINAPI wWinMain(HINSTANCE h, HINSTANCE, PWSTR, int nCmdShow) {
    LoadGame();
    const wchar_t CLASS_NAME[] = L"BizXStandaloneDesktop";
    WNDCLASSW wc{}; wc.lpfnWndProc = WndProc; wc.hInstance = h; wc.lpszClassName = CLASS_NAME; wc.hCursor = LoadCursor(nullptr, IDC_ARROW);
    RegisterClassW(&wc);
    HWND hwnd = CreateWindowExW(0, CLASS_NAME, L"BizX — Standalone VC++ Desktop", WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 590, 350, nullptr, nullptr, h, nullptr);
    if (!hwnd) return 1;
    ShowWindow(hwnd, nCmdShow); UpdateWindow(hwnd);
    MSG msg{}; while (GetMessageW(&msg, nullptr, 0, 0) > 0) { TranslateMessage(&msg); DispatchMessageW(&msg); }
    return static_cast<int>(msg.wParam);
}
