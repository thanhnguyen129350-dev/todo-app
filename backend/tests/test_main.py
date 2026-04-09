from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_get_todos():
    res = client.get("/todos")
    assert res.status_code == 200

def test_create_todo():
    res = client.post("/todos", json={
        "title": "Test",
        "description": "Test desc",
        "due_date": "2026-04-10",
        "status": "Not Done"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["title"] == "Test"

def test_update_todo():
    # tạo trước
    res = client.post("/todos", json={
        "title": "Old",
        "description": "Old",
        "due_date": "2026-04-10",
        "status": "Not Done"
    })
    todo_id = res.json()["id"]

    # update
    res = client.put(f"/todos/{todo_id}", json={
        "title": "New",
        "description": "New",
        "due_date": "2026-04-11",
        "status": "Done"
    })
    assert res.status_code == 200

def test_delete_todo():
    res = client.post("/todos", json={
        "title": "Delete",
        "description": "Delete",
        "due_date": "2026-04-10",
        "status": "Not Done"
    })
    todo_id = res.json()["id"]

    res = client.delete(f"/todos/{todo_id}")
    assert res.status_code == 200