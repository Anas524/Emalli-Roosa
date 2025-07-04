<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;
use App\Models\Contact;

class AdminController extends Controller
{
    public function viewNewsletters()
    {
        $newsletters = Newsletter::all();
        return view('admin.newsletters', compact('newsletters'));
    }

    public function viewContacts()
    {
        $contacts = Contact::all();
        return view('admin.contacts', compact('contacts'));
    }
}
