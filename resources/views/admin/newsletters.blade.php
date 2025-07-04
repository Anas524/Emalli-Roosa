<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin - Newsletter Subscriptions</title>
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    <style>
        body {
            background-color: #f9f7f6;
            font-family: 'Segoe UI', sans-serif;
            margin: 0;
            padding: 40px;
            color: #333;
        }

        h2 {
            color: #c28377;
            margin-bottom: 20px;
        }

        .newsletter-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 600px;
            margin: 0 auto;
        }

        .newsletter-card {
            background: #fff;
            border-left: 5px solid #c28377;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s ease;
        }

        .newsletter-card:hover {
            transform: translateY(-2px);
        }

        .newsletter-email {
            font-weight: 600;
            font-size: 16px;
            color: #333;
        }

        .newsletter-date {
            font-size: 13px;
            color: #777;
            margin-top: 4px;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 25px;
        }

        .page-header h2 {
            color: #c28377;
            margin: 0;
        }

        .back-btn {
            padding: 6px 12px;
            background-color: #c28377;
            color: white;
            text-decoration: none;
            font-size: 13px;
            border-radius: 4px;
            transition: background 0.3s ease;
        }

        .back-btn:hover {
            background-color: #a56c62;
        }
    </style>
</head>

<body>
    <div class="page-header">
        <h2>Newsletter Subscriptions</h2>
        <a href="{{ url('/') }}" class="back-btn">← Back to Home</a>
    </div>

    <div class="newsletter-list">
        @forelse ($newsletters as $item)
        <div class="newsletter-card">
            <div class="newsletter-email">{{ $item->email }}</div>
            <div class="newsletter-date">Subscribed on {{ $item->created_at->format('d M Y') }}</div>
        </div>
        @empty
        <p>No newsletter subscriptions found.</p>
        @endforelse
    </div>

</body>

</html>