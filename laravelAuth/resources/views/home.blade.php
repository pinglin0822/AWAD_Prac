@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    Welcome to YLLoo’s Web Application.
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                    </div>
                    @endif
                   
                    @can('isAdmin')
                    <div class="btn btn-success btn-lg">
                    You have Admin Access
                    </div>
                    @elsecan('isAuthor')
                    <div class="btn btn-primary btn-lg">
                    You have Author Access
                    </div>
                    @else
                    <div class="btn btn-info btn-lg">
                    You have User Access
                    </div>
                    @endcan
                    </div>
            </div>
        </div>
    </div>
</div>
@endsection
